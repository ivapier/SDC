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

  var result = {};
  result.product_id = req.params.product_id;
  result.results = [];

  var styleId = 0;


  db.getStyleSkus(req.params, (err, data) => {
    if (err) {
      res.status(500).send('Error getting StylesInfo');
    } else {
      // console.log("THIS IS DATA", data)

      for (var x = 0; x < data.length; x++) {
        var styleInfo = {};
        var each = data[x];
        if (each.id > styleId) {

        styleInfo.style_id = each.id;
        styleInfo.name = each.name;
        styleInfo.original_price = each.original_price;
        styleInfo.sale_price = each.sale_price;
        if (each.default_style === 0) {
          styleInfo['default?'] = false} else {
          styleInfo['default?'] = true;
          };

          styleInfo.photos = [];

          styleInfo.skus = {};
          styleInfo.skus[37] = {};
          styleInfo.skus[38] = {};
          styleInfo.skus[39] = {};
          styleInfo.skus[40] = {};
          styleInfo.skus[41] = {};
          styleInfo.skus[42] = {};

          result.results.push(styleInfo);
          styleId = each.id;
        }

        if (each.id === styleId && each.size === 'XS')  {
            result.results[styleId-1].skus[37].size = 'XS';
            result.results[styleId-1].skus[37].quantity = each.quantity
          }
          if (each.id === styleId && each.size === 'S')  {
            result.results[styleId-1].skus[38].size = 'S';
            result.results[styleId-1].skus[38].quantity = each.quantity
            }
            if (each.id === styleId && each.size === 'M') {
            result.results[styleId-1].skus[39].size = 'M';
            result.results[styleId-1].skus[39].quantity = each.quantity
            }

            if (each.id === styleId && each.size === 'L') {
            result.results[styleId-1].skus[40].size = 'L';
            result.results[styleId-1].skus[40].quantity = each.quantity
            }
            if (each.id === styleId && each.size === 'XL') {
            result.results[styleId-1].skus[41].size = 'XL';
            result.results[styleId-1].skus[41].quantity = each.quantity
            }
            if (each.id === styleId && each.size === 'XXL') {
            result.results[styleId-1].skus[42].size = 'XXL';
            result.results[styleId-1].skus[42].quantity = each.quantity
            };
            // console.log("THIS IS STYE ID", styleId)
          }
      // console.log("THIS IS RESULT.RESULTS", result.results)
    }

  });
  db.getStylePhoto(req.params, (err, data) => {
    if (err) {
      res.status(500).send('Error getting StylesInfo');
    } else {

    //  result.push(data);
    //  console.log("THIS IS DATA", data)
      for (var x = 0; x < data.length; x++) {
        var eachPhoto = data[x];
          for (var x = 0; x < result.results.length; x++) {
            var eachStyle = result.results[x];
            console.log("THIS IS EACHSTYLE", eachStyle)
              if (eachPhoto.id === eachStyle.style_id) {
                var photoInfo = {};
                photoInfo.thumbnail_url = eachPhoto.thumbnail_url;
                photoInfo.url = eachPhoto.url;
                eachStyle.photos.push(photoInfo);
              }
          };
      };
      console.log("THIS IS RESULT.RESULTS", result.results)
      res.status(200).send(JSON.stringify(result));
    }

  });
});





