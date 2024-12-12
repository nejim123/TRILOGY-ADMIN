USE nejimtrilogy_trilogy_admin;

-- Drop existing tables if they exist
DROP TABLE IF EXISTS access_logs;
DROP TABLE IF EXISTS activity_logs;
DROP TABLE IF EXISTS restaurants;
DROP TABLE IF EXISTS admins;

-- Admins table
CREATE TABLE admins (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Restaurants table
CREATE TABLE restaurants (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    api_key VARCHAR(255) UNIQUE NOT NULL,
    active BOOLEAN DEFAULT true,
    last_active TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_api_key (api_key),
    INDEX idx_active (active)
);

-- Activity logs table
CREATE TABLE activity_logs (
    id VARCHAR(36) PRIMARY KEY,
    restaurant_id VARCHAR(36),
    action VARCHAR(255) NOT NULL,
    performed_by VARCHAR(255) NOT NULL,
    ip_address VARCHAR(45),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE SET NULL,
    INDEX idx_created_at (created_at)
);

-- Access logs table
CREATE TABLE access_logs (
    id VARCHAR(36) PRIMARY KEY,
    restaurant_id VARCHAR(36),
    api_key VARCHAR(255) NOT NULL,
    ip_address VARCHAR(45) NOT NULL,
    status ENUM('granted', 'denied') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE SET NULL,
    INDEX idx_status (status),
    INDEX idx_created_at (created_at)
);

-- Insert default admin user (password: admin123)
INSERT INTO admins (id, name, email, password) VALUES (
    UUID(),
    'Admin',
    'admin@trilogy.host',
    '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj2NXFp3drt.'
);

-- Create indexes for performance
CREATE INDEX idx_restaurant_email ON restaurants(email);
CREATE INDEX idx_access_logs_date ON access_logs(created_at);
CREATE INDEX idx_activity_logs_date ON activity_logs(created_at);

-- Grant permissions
GRANT ALL PRIVILEGES ON nejimtrilogy_trilogy_admin.* 
TO 'nejimtrilogy_trilogy_user'@'localhost';
FLUSH PRIVILEGES;
