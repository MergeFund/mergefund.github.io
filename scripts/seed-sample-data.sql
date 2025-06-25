-- Insert sample profiles (these would normally be created via auth signup)
INSERT INTO profiles (id, username, full_name, bio, github_username, total_earnings, bounties_completed) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'alexdev', 'Alex Johnson', 'Full-stack developer passionate about open source', 'alexjohnson', 2847.00, 23),
('550e8400-e29b-41d4-a716-446655440001', 'sarahcode', 'Sarah Chen', 'Frontend specialist with React expertise', 'sarahchen', 1950.00, 15),
('550e8400-e29b-41d4-a716-446655440002', 'mikebuild', 'Mike Rodriguez', 'Backend engineer and DevOps enthusiast', 'mikerodriguez', 3200.00, 28);

-- Insert sample bounties
INSERT INTO bounties (title, description, reward_amount, difficulty, repository_url, tags, deadline, created_by) VALUES
('Fix authentication bug in React app', 'There is a critical authentication issue that needs to be resolved. Users are unable to log in properly when using social authentication providers. The issue appears to be related to token validation.', 150.00, 'Medium', 'https://github.com/mergefund/web-app', ARRAY['React', 'Authentication', 'Bug Fix', 'OAuth'], NOW() + INTERVAL '3 days', '550e8400-e29b-41d4-a716-446655440000'),

('Add dark mode to dashboard', 'Implement a complete dark mode theme for the user dashboard with proper color schemes and transitions. Should include toggle functionality and persist user preference in localStorage.', 200.00, 'Easy', 'https://github.com/mergefund/dashboard', ARRAY['CSS', 'UI/UX', 'Feature', 'Dark Mode'], NOW() + INTERVAL '7 days', '550e8400-e29b-41d4-a716-446655440001'),

('Optimize database queries for better performance', 'Several database queries are running slowly and need optimization. Focus on user data retrieval and bounty listing queries. Include proper indexing and query optimization techniques.', 300.00, 'Hard', 'https://github.com/mergefund/backend', ARRAY['Database', 'Performance', 'SQL', 'Optimization'], NOW() + INTERVAL '5 days', '550e8400-e29b-41d4-a716-446655440002'),

('Create mobile-responsive navigation component', 'Build a responsive navigation component that works seamlessly across all device sizes. Should include hamburger menu for mobile and proper accessibility features.', 120.00, 'Medium', 'https://github.com/mergefund/components', ARRAY['React', 'CSS', 'Mobile', 'Responsive'], NOW() + INTERVAL '4 days', '550e8400-e29b-41d4-a716-446655440000'),

('Implement real-time notifications system', 'Add real-time notifications using WebSockets for bounty updates and user interactions. Should include proper error handling and reconnection logic.', 400.00, 'Hard', 'https://github.com/mergefund/notifications', ARRAY['WebSocket', 'Real-time', 'Backend', 'Notifications'], NOW() + INTERVAL '14 days', '550e8400-e29b-41d4-a716-446655440001'),

('Add unit tests for payment processing', 'Write comprehensive unit tests for the payment processing module to ensure reliability. Should cover edge cases and error scenarios with proper mocking.', 180.00, 'Medium', 'https://github.com/mergefund/payments', ARRAY['Testing', 'Jest', 'Payments', 'Unit Tests'], NOW() + INTERVAL '6 days', '550e8400-e29b-41d4-a716-446655440002');

-- Insert sample contributions
INSERT INTO contributions (bounty_id, contributor_id, submission_url, description, status) VALUES
((SELECT id FROM bounties WHERE title = 'Fix authentication bug in React app'), '550e8400-e29b-41d4-a716-446655440001', 'https://github.com/mergefund/web-app/pull/123', 'Fixed OAuth token validation issue by updating the authentication middleware', 'Under Review'),
((SELECT id FROM bounties WHERE title = 'Add dark mode to dashboard'), '550e8400-e29b-41d4-a716-446655440002', 'https://github.com/mergefund/dashboard/pull/45', 'Implemented complete dark mode with CSS variables and localStorage persistence', 'Approved');

-- Insert sample notifications
INSERT INTO notifications (user_id, title, message, type) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'Payment Received', 'You received $250 for completing "API endpoint optimization"', 'payment'),
('550e8400-e29b-41d4-a716-446655440000', 'Bounty Claimed', 'Your bounty "Fix mobile responsive issues" has been claimed', 'bounty'),
('550e8400-e29b-41d4-a716-446655440001', 'Review Requested', 'Your submission for "Authentication bug fix" is under review', 'bounty'),
('550e8400-e29b-41d4-a716-446655440002', 'Contribution Merged', 'Your contribution to "Add user authentication" has been merged', 'bounty');
