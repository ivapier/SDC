//PRODUCTS

//MONGODB
PRODUCT document
{
  productID: { type: Number, unique: true },
  name: { type: String, unique: true},
  slogan: String,
  description: String,
  category: String,
  defaultPrice: Number,
  features: [Object],
  related: [Number],
  styles: [Number]
};
STYLE document
{
  styleID: { type: Number, unique: true },
  productID: [Number],
  name: String,
  originalPrice: Number,
  salePrice: Number,
  photo: [Object],
  skus: {String}
}


//MYSQL

TABLE product (
  product_id int NOT NULL AUTO_INCREMENT,
  name varchar(50) NOT NULL,
  slogan varchar(50) NOT NULL,
  description varchar(100) NOT NULL,
  category varchar(50) NOT NULL,
  defaultPrice: decimal(10, 2) NOT NULL,
  features: ARRAY[VARCHAR(20)]
  related: int,
  style_id int,
  FOREIGN KEY (style_id) REFERENCES style(style_id),
  PRIMARY KEY (product_id)
);

TABLE style (
  style_id int NOT NULL AUTO_INCREMENT,
  name varchar(50) NOT NULL,
  originalPrice: decimal(10, 2) NOT NULL,
  salePrice: decimal(10, 2) NOT NULL,
  photo_id int,
  skus: {String},
  PRIMARY KEY (style_id)
);

TABLE photo {
  photo_id int NOT NULL AUTO_INCREMENT,
  style_id int,
  url String,
  PRIMARY KEY (photo_id)
}
TABLE size {
  size_id NOT NULL AUTO_INCREMENT,
  name varchar(50) NOT NULL,
  skus_id int,
  style_id int,
  quantity int
}

//convert scv into object 6 different service files ran


//use docker container link the persistent data locally through that

