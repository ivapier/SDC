const mysql = require('mysql');
const mysqlConfig = require('./config.js');

const connection = mysql.createConnection(mysqlConfig);

connection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Connected to MySQL!');
  }
});

//SQL QUERIES
module.exports.getAllProducts = (callback) => {
  connection.query('SELECT * FROM product;', (err, data) => {
    if (err) {
      callback(err);
    } else {
      console.log("THIS IS DATA", data)
      callback(null, data);
    }
  });
};
// product_id, name, slogan, description, category, defaultPrice


module.exports.getProductInfo = (params, callback) => {
  // console.log('THIS IS PARAMS', params.product_id);
  connection.query(`SELECT product.id, product.name, product.slogan, product.description, product.category, product.default_price, features.feature, features.value
  FROM features
  INNER JOIN product ON features.product_id=product.id WHERE product.id = '${params.product_id}';`, (err, data) => {
    if (err) {
      callback(err);
    } else {
      // console.log("THIS IS DATA", data)
      callback(null, data);
    }
  });
};


module.exports.getStyleSkus = (params, callback) => {
  console.log('THIS IS PARAMS', params.product_id);
  connection.query(`SELECT style.product_id, style.id, style.name, style.original_price, style.sale_price, style.default_style, skus.id, skus.quantity, skus.size
  FROM style
  INNER JOIN skus ON skus.style_id=style.id
  WHERE style.product_id = '${params.product_id}';`, (err, data) => {
    if (err) {
      callback(err);
    } else {
        //  console.log("THIS IS DATA", data)
      callback(null, data);
    }
  });
};
module.exports.getStylePhoto = (params, callback) => {
  console.log('THIS IS PARAMS', params.product_id);
  connection.query(`SELECT style.product_id, photo.style_id, photo.thumbnail_url, photo.url
  FROM style
  INNER JOIN photo ON photo.style_id=style.id
  WHERE style.product_id = '${params.product_id}';`, (err, data) => {
    if (err) {
      callback(err);
    } else {
        //  console.log("THIS IS DATA", data)
      callback(null, data);
    }
  });
};


// UNION
//   SELECT style.product_id, style.id, photo.id, photo.thumbnail_url, photo.url
//   FROM style
//   INNER JOIN photo ON photo.style_id=style.id
//   WHERE style.product_id = '${params.product_id}'

// SELECT style.product_id, style.id, style.name, style.original_price, style.sale_price, style.default_style, photo.id, photo.thumbnail_url, photo.url, skus.id, skus.quantity, skus.size
//   FROM style
//   INNER JOIN photo ON photo.style_id=style.id
//   INNER JOIN skus ON skus.style_id=style.id
//   WHERE style.product_id = '${params.product_id}'



// module.exports.update = (params, body, callback) => {
//   console.log('THIS IS PARAMS', params.transaction_id);
//   console.log('THIS IS body', body.categoryId);
//   connection.query(`UPDATE transactions SET category_id = '${body.categoryId}' WHERE transaction_id = '${params.transaction_id}';`, (err, data) => {
//     if (err) {
//       callback(err);
//     } else {
//       callback(null, data);
//     }
//   });
// };