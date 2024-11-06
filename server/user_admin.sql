USE co_wiki;

CREATE TABLE admin_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL
);

USE co_wiki;

INSERT INTO admin_users (email) VALUES 
('zxcv828133@gmail.com'),
('pqpq7838@gmail.com');
