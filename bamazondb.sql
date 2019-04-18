DROP DATABASE IF EXISTS bamazondb;

CREATE DATABASE bamazondb;

USE bamazondb;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product VARCHAR(45) NULL,
  category VARCHAR(45) NULL,
  price DECIMAL(10,2) NULL,
  quantity INT NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (product, category, price, quantity)
VALUES ("leash", "accessories", 10.50, 100);

INSERT INTO products (product, category, price, quantity)
VALUES ("food bowl", "nutrition", 5.50, 100);

INSERT INTO products (product, category, price, quantity)
VALUES ("poop bags", "cleaning", 4.00, 100);

INSERT INTO products (product, category, price, quantity)
VALUES ("dry food", "nutrition", 15.75, 100);

INSERT INTO products (product, category, price, quantity)
VALUES ("shampoo", "cleaning", 7.00, 100);

INSERT INTO products (product, category, price, quantity)
VALUES ("pooper scooper", "cleaning", 5.50, 100);

INSERT INTO products (product, category, price, quantity)
VALUES ("bone", "nutrition", 1.50, 100);

INSERT INTO products (product, category, price, quantity)
VALUES ("ball", "toys", 2.00, 100);

INSERT INTO products (product, category, price, quantity)
VALUES ("plush monkey", "toys", 4.75, 100);

INSERT INTO products (product, category, price, quantity)
VALUES ("crate", "accessories", 19.99, 100);



-- ### Alternative way to insert more than one row
-- INSERT INTO products (flavor, price, quantity)
-- VALUES ("vanilla", 2.50, 100), ("chocolate", 3.10, 120), ("strawberry", 3.25, 75);
