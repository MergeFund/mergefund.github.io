-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  full_name TEXT,
  bio TEXT,
  avatar_url TEXT,
  github_username TEXT,
  twitter_username TEXT,
  linkedin_username TEXT,
  total_earnings DECIMAL(10,2) DEFAULT 0,
  bounties_completed INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create bounties table
CREATE TABLE IF NOT EXISTS bounties (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  reward_amount DECIMAL(10,2) NOT NULL,
  difficulty TEXT CHECK (difficulty IN ('Easy', 'Medium', 'Hard')) NOT NULL,
  status TEXT CHECK (status IN ('Open', 'Claimed', 'In Progress', 'Under Review', 'Completed', 'Cancelled')) DEFAULT 'Open',
  repository_url TEXT NOT NULL,
  issue_url TEXT,
  tags TEXT[] DEFAULT '{}',
  deadline TIMESTAMP WITH TIME ZONE NOT NULL,
  created_by UUID REFERENCES profiles(id) NOT NULL,
  claimed_by UUID REFERENCES profiles(id),
  completed_by UUID REFERENCES profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create contributions table
CREATE TABLE IF NOT EXISTS contributions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  bounty_id UUID REFERENCES bounties(id) NOT NULL,
  contributor_id UUID REFERENCES profiles(id) NOT NULL,
  submission_url TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT CHECK (status IN ('Submitted', 'Under Review', 'Approved', 'Rejected')) DEFAULT 'Submitted',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT CHECK (type IN ('bounty', 'payment', 'system', 'mention')) NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create waitlist table
CREATE TABLE IF NOT EXISTS waitlist (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  role TEXT NOT NULL,
  github_profile TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE bounties ENABLE ROW LEVEL SECURITY;
ALTER TABLE contributions ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view all profiles" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view all bounties" ON bounties FOR SELECT USING (true);
CREATE POLICY "Users can create bounties" ON bounties FOR INSERT WITH CHECK (auth.uid() = created_by);
CREATE POLICY "Users can update own bounties" ON bounties FOR UPDATE USING (auth.uid() = created_by);

CREATE POLICY "Users can view all contributions" ON contributions FOR SELECT USING (true);
CREATE POLICY "Users can create contributions" ON contributions FOR INSERT WITH CHECK (auth.uid() = contributor_id);
CREATE POLICY "Users can update own contributions" ON contributions FOR UPDATE USING (auth.uid() = contributor_id);

CREATE POLICY "Users can view own notifications" ON notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own notifications" ON notifications FOR UPDATE USING (auth.uid() = user_id);

-- Allow anyone to insert into waitlist (no auth required)
CREATE POLICY "Allow insert for anyone" ON waitlist AS PERMISSIVE FOR INSERT TO anon WITH CHECK (true);

-- Create functions and triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bounties_updated_at BEFORE UPDATE ON bounties
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contributions_updated_at BEFORE UPDATE ON contributions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
