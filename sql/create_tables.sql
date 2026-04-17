CREATE DATABASE IF NOT EXISTS comp7780;
USE comp7780;

CREATE TABLE IF NOT EXISTS cart (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cust_username VARCHAR(100) NOT NULL,
  cart_order_date DATE NOT NULL,
  product_name VARCHAR(255) NOT NULL,
  cart_qty INT NOT NULL,
  cart_price DECIMAL(10,2) NOT NULL,
  status VARCHAR(20) DEFAULT 'cart' COMMENT 'cart: in shopping cart, completed: purchased',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
