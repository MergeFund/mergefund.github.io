-- Insert sample reputation scores
INSERT INTO reputation_scores (user_id, total_score, github_score, bounty_score, community_score, badges) VALUES
('550e8400-e29b-41d4-a716-446655440000', 1247, 450, 650, 147, ARRAY['Elite Contributor', 'Bounty Hunter', 'GitHub Master']),
('550e8400-e29b-41d4-a716-446655440001', 890, 320, 480, 90, ARRAY['Senior Developer', 'Open Source Advocate']),
('550e8400-e29b-41d4-a716-446655440002', 1580, 680, 750, 150, ARRAY['Elite Contributor', 'GitHub Master', 'Problem Solver']);

-- Insert sample reputation activities
INSERT INTO reputation_activities (user_id, activity_type, points_earned, description, metadata) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'bounty_completed', 65, 'Completed bounty: Fix authentication bug in React app', '{"bounty_id": "1", "reward_amount": 150, "repository": "mergefund/web-app"}'),
('550e8400-e29b-41d4-a716-446655440000', 'pr_merged', 25, 'Pull request merged in awesome-ai-tools repository', '{"repository": "developer/awesome-ai-tools", "pr_number": 42}'),
('550e8400-e29b-41d4-a716-446655440000', 'repo_starred', 2, 'Repository starred: next-gen-framework', '{"repository": "techcorp/next-gen-framework"}'),

('550e8400-e29b-41d4-a716-446655440001', 'bounty_completed', 70, 'Completed bounty: Add dark mode to dashboard', '{"bounty_id": "2", "reward_amount": 200, "repository": "mergefund/dashboard"}'),
('550e8400-e29b-41d4-a716-446655440001', 'issue_created', 5, 'Created issue in open source project', '{"repository": "opensource/project", "issue_number": 123}'),

('550e8400-e29b-41d4-a716-446655440002', 'bounty_completed', 80, 'Completed bounty: Optimize database queries', '{"bounty_id": "3", "reward_amount": 300, "repository": "mergefund/backend"}'),
('550e8400-e29b-41d4-a716-446655440002', 'donation_received', 15, 'Received donation for open source work', '{"amount": 50, "repository": "mikerodriguez/awesome-tool"}');

-- Insert sample wallets
INSERT INTO wallets (user_id, address, private_key_encrypted, balance) VALUES
('550e8400-e29b-41d4-a716-446655440000', '0xa1b2c3d4e5f6789012345678901234567890abcd', 'ZW5jcnlwdGVkX3ByaXZhdGVfa2V5XzE=', 2847.50),
('550e8400-e29b-41d4-a716-446655440001', '0xb2c3d4e5f6789012345678901234567890abcdef', 'ZW5jcnlwdGVkX3ByaXZhdGVfa2V5XzI=', 1950.25),
('550e8400-e29b-41d4-a716-446655440002', '0xc3d4e5f6789012345678901234567890abcdef12', 'ZW5jcnlwdGVkX3ByaXZhdGVfa2V5XzM=', 3200.75);

-- Insert sample transactions
INSERT INTO transactions (from_wallet, to_wallet, amount, type, status, transaction_hash, metadata) VALUES
('0x1234567890123456789012345678901234567890', '0xa1b2c3d4e5f6789012345678901234567890abcd', 150.00, 'bounty_payment', 'completed', '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890', '{"bounty_title": "Fix authentication bug", "bounty_id": "1"}'),
('0x1234567890123456789012345678901234567890', '0xb2c3d4e5f6789012345678901234567890abcdef', 200.00, 'bounty_payment', 'completed', '0xbcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890a', '{"bounty_title": "Add dark mode", "bounty_id": "2"}'),
('0xa1b2c3d4e5f6789012345678901234567890abcd', '0xc3d4e5f6789012345678901234567890abcdef12', 50.00, 'donation', 'completed', '0xcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890ab', '{"repository": "mikerodriguez/awesome-tool", "message": "Great work!"}');

-- Update account types
UPDATE profiles SET account_type = 'both' WHERE username IN ('alexdev', 'mikerodriguez');
UPDATE profiles SET account_type = 'developer' WHERE username = 'sarahcode';
