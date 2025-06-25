-- Create wallets table
CREATE TABLE IF NOT EXISTS wallets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) NOT NULL UNIQUE,
  address TEXT NOT NULL UNIQUE,
  private_key_encrypted TEXT NOT NULL,
  balance DECIMAL(18,8) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create transactions table
CREATE TABLE IF NOT EXISTS transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  from_wallet TEXT NOT NULL,
  to_wallet TEXT NOT NULL,
  amount DECIMAL(18,8) NOT NULL,
  type TEXT CHECK (type IN ('bounty_payment', 'donation', 'withdrawal', 'deposit')) NOT NULL,
  status TEXT CHECK (status IN ('pending', 'completed', 'failed')) DEFAULT 'pending',
  transaction_hash TEXT,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create reputation_scores table
CREATE TABLE IF NOT EXISTS reputation_scores (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) NOT NULL UNIQUE,
  total_score INTEGER DEFAULT 0,
  github_score INTEGER DEFAULT 0,
  bounty_score INTEGER DEFAULT 0,
  community_score INTEGER DEFAULT 0,
  badges TEXT[] DEFAULT '{}',
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create reputation_activities table
CREATE TABLE IF NOT EXISTS reputation_activities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) NOT NULL,
  activity_type TEXT CHECK (activity_type IN ('bounty_completed', 'repo_starred', 'issue_created', 'pr_merged', 'donation_received')) NOT NULL,
  points_earned INTEGER NOT NULL,
  description TEXT NOT NULL,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add account_type to profiles table
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS account_type TEXT CHECK (account_type IN ('developer', 'repo_owner', 'both')) DEFAULT 'developer';

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_wallets_user_id ON wallets(user_id);
CREATE INDEX IF NOT EXISTS idx_wallets_address ON wallets(address);
CREATE INDEX IF NOT EXISTS idx_transactions_from_wallet ON transactions(from_wallet);
CREATE INDEX IF NOT EXISTS idx_transactions_to_wallet ON transactions(to_wallet);
CREATE INDEX IF NOT EXISTS idx_transactions_type ON transactions(type);
CREATE INDEX IF NOT EXISTS idx_reputation_scores_total_score ON reputation_scores(total_score DESC);
CREATE INDEX IF NOT EXISTS idx_reputation_activities_user_id ON reputation_activities(user_id);
CREATE INDEX IF NOT EXISTS idx_reputation_activities_created_at ON reputation_activities(created_at DESC);

-- Enable RLS on new tables
ALTER TABLE wallets ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE reputation_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE reputation_activities ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view own wallet" ON wallets FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own wallet" ON wallets FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own transactions" ON transactions 
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM wallets 
      WHERE (address = transactions.from_wallet OR address = transactions.to_wallet) 
      AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can view all reputation scores" ON reputation_scores FOR SELECT USING (true);
CREATE POLICY "Users can update own reputation score" ON reputation_scores FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can view all reputation activities" ON reputation_activities FOR SELECT USING (true);
CREATE POLICY "Users can create own reputation activities" ON reputation_activities FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create triggers for updated_at
CREATE TRIGGER update_wallets_updated_at BEFORE UPDATE ON wallets
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_transactions_updated_at BEFORE UPDATE ON transactions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to create wallet on profile creation
CREATE OR REPLACE FUNCTION create_wallet_for_new_user()
RETURNS TRIGGER AS $$
DECLARE
  wallet_address TEXT;
  encrypted_key TEXT;
BEGIN
  -- Generate a simple wallet address (in production, use proper crypto libraries)
  wallet_address := '0x' || encode(gen_random_bytes(20), 'hex');
  encrypted_key := encode(gen_random_bytes(32), 'base64');
  
  INSERT INTO wallets (user_id, address, private_key_encrypted, balance)
  VALUES (NEW.id, wallet_address, encrypted_key, 100.00); -- Give $100 starting balance
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to create wallet when profile is created
CREATE TRIGGER create_wallet_on_profile_creation
  AFTER INSERT ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION create_wallet_for_new_user();
