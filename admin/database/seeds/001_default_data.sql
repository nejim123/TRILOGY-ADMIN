-- Insert default data
BEGIN;

-- Insert default admin if not exists
INSERT IGNORE INTO admins (id, name, email, password) VALUES (
    UUID(),
    'Admin',
    'admin@trilogy.host',
    '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj2NXFp3drt.'
);

-- Insert test restaurants if needed
INSERT IGNORE INTO restaurants (id, name, email, api_key) VALUES
(
    UUID(),
    'Test Restaurant',
    'test@restaurant.com',
    'trg_test123456789'
);

COMMIT;
