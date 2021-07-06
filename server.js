const express = require("express");
const bodyParser = require("body-parser");
const db = require('./database_mysql');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/product/:id', express.static(__dirname + "/public"));
app.get('/', (req, res) => {
  res.redirect('/product/11001');
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});


//REQUESTS
// axios.get(API_ROOT + `/products/${this.props.productId}/related`, HEADERS)



app.get('/api/products', (req, res) => {
  db.getAllProducts((err, data) => {
    if (err) {
      res.status(500).send('Error getting products');
    } else {
      // console.log("THIS IS DATA", data)
      res.status(200).send(JSON.stringify(data));
    }
  });
});

app.get('/api/products/:product_id', (req, res) => {
  db.getProductInfo(req.params, (err, data) => {
    if (err) {
      res.status(500).send('Error getting productInfo');
    } else {
      console.log("THIS IS DATA", data)
      // var result = {};
      // result.id = data[0].id;
      // result.name = data[0].name;
      // result.slogan = data[0].slogan;
      // result.description = data[0].description;
      // result.category = data[0].category;
      // result.default_price = data[0].default_price;
      var result = data[0];
      delete result.feature;
      delete result.value;
      result.features = [];
      for (var x = 0; x < data.length; x++) {
        var eachFeatData = data[x];
        var eachFeat = {};
        eachFeat.feature = eachFeatData.feature;
        eachFeat.value = eachFeatData.value;
        result.features.push(eachFeat);
      }

      res.status(200).send(JSON.stringify(result));
    }
  });
});



app.get('/api/products/:product_id/styles', (req, res) => {

  var result = {}
  db.getStyleSkus(req.params, (err, data) => {
    if (err) {
      res.status(500).send('Error getting StylesInfo');
    } else {
      // console.log("THIS IS DATA", data)
      result.product_id = req.params.product_id;
      result.results = [];
      result.results.push(data);

      // res.status(200).send(JSON.stringify(data));
    }
  });
  db.getStylePhoto(req.params, (err, data) => {
    if (err) {
      res.status(500).send('Error getting StylesInfo');
    } else {

     result.push(data);
    //  console.log("THIS IS DATA", data)



      res.status(200).send(JSON.stringify(result));
    }
  });
});





