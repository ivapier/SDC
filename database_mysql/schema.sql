DROP DATABASE IF EXISTS sdc;

CREATE DATABASE sdc;

USE sdc;


CREATE TABLE product (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(500) NOT NULL,
  slogan varchar(500) NOT NULL,
  description varchar(1000) NOT NULL,
  category varchar(100) NOT NULL,
  default_price decimal(10, 2) NOT NULL,
   PRIMARY KEY (id)
);
-- id,name,slogan,description,category,default_price

-- LOAD DATA LOCAL INFILE './database_mysql/product.csv' INTO TABLE product
-- FIELDS TERMINATED BY ','
-- ENCLOSED BY '"'
-- LINES TERMINATED BY '\n'
-- IGNORE 1 ROWS
-- (id,name,slogan,description,category,default_price);

-- json.parse and map function

CREATE TABLE style (
  id int NOT NULL AUTO_INCREMENT,
  product_id int,
  name varchar(500) NOT NULL,
  sale_price decimal(10, 2) NOT NULL,
  original_price decimal(10, 2) NOT NULL,
  default_style int,
  FOREIGN KEY (product_id) REFERENCES product(id),
   PRIMARY KEY (id)

);
-- id,productId,name,sale_price,original_price,default_style

-- LOAD DATA LOCAL INFILE './database_mysql/styles.csv' INTO TABLE style
-- FIELDS TERMINATED BY ','
-- ENCLOSED BY '"'
-- LINES TERMINATED BY '\n'
-- IGNORE 1 ROWS
-- (id,product_id,name,sale_price,original_price,default_style);


CREATE TABLE photo (
  id int NOT NULL AUTO_INCREMENT,
  style_id int,
  url varchar(1000) NOT NULL,
  thumbnail_url varchar(1000) NOT NULL,
 FOREIGN KEY (style_id) REFERENCES style(id),
 PRIMARY KEY (id)
);
-- id,styleId,url,thumbnail_url

-- LOAD DATA LOCAL INFILE './database_mysql/photos.csv' INTO TABLE photo
-- FIELDS TERMINATED BY ','
-- ENCLOSED BY '"'
-- LINES TERMINATED BY '\n'
-- IGNORE 1 ROWS
-- (id,style_id, url, thumbnail_url);

CREATE TABLE skus (
  id int NOT NULL AUTO_INCREMENT,
  style_id int,
  size varchar(50) NOT NULL,
  quantity int,
  FOREIGN KEY (style_id) REFERENCES style(id),
  PRIMARY KEY (id)
);
-- id,styleId,size,quantity

-- LOAD DATA LOCAL INFILE './database_mysql/skus.csv' INTO TABLE skus
-- FIELDS TERMINATED BY ','
-- ENCLOSED BY '"'
-- LINES TERMINATED BY '\n'
-- IGNORE 1 ROWS
-- (id,style_id, size, quantity);

CREATE TABLE features (
  id int NOT NULL AUTO_INCREMENT,
  product_id int,
  feature varchar(500) NOT NULL,
  value varchar(500) NOT NULL,
  FOREIGN KEY (product_id) REFERENCES product(id),
  PRIMARY KEY (id)
);
-- id,product_id,feature,value

-- LOAD DATA LOCAL INFILE './database_mysql/features.csv' INTO TABLE features
-- FIELDS TERMINATED BY ','
-- ENCLOSED BY '"'
-- LINES TERMINATED BY '\n'
-- IGNORE 1 ROWS
-- (id,product_id,feature,value);


CREATE TABLE related (
  id int NOT NULL AUTO_INCREMENT,
  current_product_id int,
  related_product_id int,
  PRIMARY KEY (id)
);
-- id,current_product_id,related_product_id

-- LOAD DATA LOCAL INFILE './database_mysql/related.csv' INTO TABLE related
-- FIELDS TERMINATED BY ','
-- ENCLOSED BY '"'
-- LINES TERMINATED BY '\n'
-- IGNORE 1 ROWS
-- (id,current_product_id,related_product_id);





-- mysql -h hostname -u user database < path/to/test.sql   // < /database_mysql/schema.sql
--mysql -h localhost -u sdc < ./database_mysql/schema.sql NOT WORKING

--mysql -u root -p (OPEN MYSQL)
--show databases;
--use sdc;
--show tables;
--describe photo;

--SERVER ALREADY IN USE ERROR
--sudo lsof -i :3000
--kill -9 52857 - this number is the <PID number>

-- POSTRESQL Copy ‘products’ (first name, lastname) FROM (something.csv) Format csv, delimiter ‘,’ header [true];