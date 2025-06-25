-- Add new columns to profiles table
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS account_type TEXT CHECK (account_type IN ('developer', 'repo_owner', 'both')) DEFAULT 'developer';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS skills TEXT[] DEFAULT '{}';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS location TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS company TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS website TEXT;

-- Create on-chain activity log table
CREATE TABLE IF NOT EXISTS on_chain_activities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) NOT NULL,
  activity_type TEXT NOT NULL,
  description TEXT NOT NULL,
  transaction_hash TEXT,
  block_number BIGINT,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create donations table
CREATE TABLE IF NOT EXISTS donations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  from_user_id UUID REFERENCES profiles(id) NOT NULL,
  to_user_id UUID REFERENCES profiles(id) NOT NULL,
  amount DECIMAL(18,8) NOT NULL,
  message TEXT,
  transaction_hash TEXT,
  status TEXT CHECK (status IN ('pending', 'completed', 'failed')) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create repository tracking table
CREATE TABLE IF NOT EXISTS tracked_repositories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  owner_id UUID REFERENCES profiles(id) NOT NULL,
  github_repo_id BIGINT NOT NULL,
  repo_name TEXT NOT NULL,
  repo_full_name TEXT NOT NULL,
  description TEXT,
  stars_count INTEGER DEFAULT 0,
  forks_count INTEGER DEFAULT 0,
  language TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(github_repo_id)
);

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_on_chain_activities_user_id ON on_chain_activities(user_id);
CREATE INDEX IF NOT EXISTS idx_on_chain_activities_created_at ON on_chain_activities(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_donations_from_user ON donations(from_user_id);
CREATE INDEX IF NOT EXISTS idx_donations_to_user ON donations(to_user_id);
CREATE INDEX IF NOT EXISTS idx_tracked_repositories_owner ON tracked_repositories(owner_id);
CREATE INDEX IF NOT EXISTS idx_tracked_repositories_stars ON tracked_repositories(stars_count DESC);

-- Enable RLS
ALTER TABLE on_chain_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE tracked_repositories ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view all on-chain activities" ON on_chain_activities FOR SELECT USING (true);
CREATE POLICY "Users can create own on-chain activities" ON on_chain_activities FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view all donations" ON donations FOR SELECT USING (true);
CREATE POLICY "Users can create donations" ON donations FOR INSERT WITH CHECK (auth.uid() = from_user_id);

CREATE POLICY "Users can view all tracked repositories" ON tracked_repositories FOR SELECT USING (true);
CREATE POLICY "Users can manage own repositories" ON tracked_repositories FOR ALL USING (auth.uid() = owner_id);

-- Create triggers
CREATE TRIGGER update_tracked_repositories_updated_at BEFORE UPDATE ON tracked_repositories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to log on-chain activity
CREATE OR REPLACE FUNCTION log_on_chain_activity(
  p_user_id UUID,
  p_activity_type TEXT,
  p_description TEXT,
  p_transaction_hash TEXT DEFAULT NULL,
  p_metadata JSONB DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
  activity_id UUID;
BEGIN
  INSERT INTO on_chain_activities (user_id, activity_type, description, transaction_hash, metadata)
  VALUES (p_user_id, p_activity_type, p_description, p_transaction_hash, p_metadata)
  RETURNING id INTO activity_id;
  
  RETURN activity_id;
END;
$$ LANGUAGE plpgsql;
