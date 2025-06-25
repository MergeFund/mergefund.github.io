-- Create repo_wallets table for repository donations
CREATE TABLE IF NOT EXISTS repo_wallets (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    repo_full_name TEXT NOT NULL UNIQUE,
    owner_login TEXT NOT NULL,
    wallet_address TEXT NOT NULL UNIQUE,
    balance DECIMAL(10,2) DEFAULT 0,
    total_donations DECIMAL(10,2) DEFAULT 0,
    donation_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create on_chain_activities table for tracking all on-chain activities
CREATE TABLE IF NOT EXISTS on_chain_activities (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    activity_type TEXT NOT NULL,
    description TEXT NOT NULL,
    transaction_hash TEXT,
    block_number BIGINT,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add skills column to profiles if it doesn't exist
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS skills TEXT[] DEFAULT '{}';

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_repo_wallets_repo_name ON repo_wallets(repo_full_name);
CREATE INDEX IF NOT EXISTS idx_repo_wallets_owner ON repo_wallets(owner_login);
CREATE INDEX IF NOT EXISTS idx_on_chain_activities_user_id ON on_chain_activities(user_id);
CREATE INDEX IF NOT EXISTS idx_on_chain_activities_type ON on_chain_activities(activity_type);
CREATE INDEX IF NOT EXISTS idx_on_chain_activities_created_at ON on_chain_activities(created_at DESC);

-- Update trigger for repo_wallets
CREATE OR REPLACE FUNCTION update_repo_wallet_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_repo_wallets_updated_at
    BEFORE UPDATE ON repo_wallets
    FOR EACH ROW
    EXECUTE FUNCTION update_repo_wallet_updated_at();
