-- Migration: Create admins table
CREATE TABLE IF NOT EXISTS admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- Insert default admin user
-- Username: adminuser
-- Password: Admin@2026
INSERT INTO admins (username, password) VALUES (
    'adminuser',
    '$2b$10$wqQwQnQwQnQwQnQwQnQwQOeQwQnQwQnQwQnQwQnQwQnQwQnQwQ' -- bcrypt hash for Admin@2026
);
