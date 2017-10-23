  var path = require('path')
  , router = require('express').Router()
  , config = require('../../../config')
  , passport = require('passport')
  , request = require('request')
  , firebase = require('firebase');



router.post('/inventory', function (req, res) {
  console.log('req', req.body.id)
  var url = `http://steamcommunity.com/inventory/${req.body.id}/730/2?l=polish&count=5000`;

  request.get(url, function (error, steamHttpResponse, steamHttpBody) {
    res.send(steamHttpBody);
  });
});

router.post('/price', function (req, res) {
  let ref = firebase.database().ref('items').child(req.body.name);

  ref.once('value', function (snapshot) {
    var exists = (snapshot.val() !== null);
    if(exists){
      console.log('element', snapshot.val().price)
      res.send(JSON.stringify(snapshot.val().price));
    } else {
      console.log('Not found', req.body.name)
    }
  })

  var url = `http://steamcommunity.com/market/priceoverview/json/?key=8EA076358F99E86424EC22B64ADE01C3&appid=730&currency=3&market_hash_name=${req.body.name}`;

  let response = {};

});

router.post('/item_data', function (req, res) {
  console.log('START!')
  let items = req.body.items
    , outputItems = []
    , notFoundItems = [];
  items.forEach(function(element,index) {
    let ref = firebase.database().ref('items').child(element.market_hash_name);

    ref.once('value', function (snapshot) {
    var exists = (snapshot.val() !== null);
    if(exists){
      outputItems.push(snapshot.val())
    } else {
      notFoundItems.push(element);
      console.log(index, 'Not found', req.body.name)
    }
    if(index >= items.length-1){
    console.log(index,'END',items.length);
    res.send(outputItems);
    console.log(notFoundItems.length)
    if(notFoundItems.length>0){
      buildModelAndSend(notFoundItems);
    }
  }
  })
  
  }, this);

  

  // var url = `http://steamcommunity.com/market/priceoverview/json/?key=8EA076358F99E86424EC22B64ADE01C3&appid=730&currency=3&market_hash_name=${req.body.name}`;

  // let response = {};

});

router.post('/update_prices', function (req, res) {
  let items = req.body.items;
  buildModelAndSend(items);
  res.send('Done');

});

function buildModelAndSend(items){
  let i = 0;

  let interval = setInterval(() => {
    console.log(i, '/', items.length - 1);
    if(i>items.length-1){
      clearInterval(interval);
    } else {
      let model = {
        name: items[i].name,
        market_hash_name: items[i].market_hash_name,
        name_color: items[i].name_color,
        icon_url: items[i].icon_url,
        price: ''
      }
      sendPriceToFirebase(model)
    }
    i++;
  }, 3000)
}

function sendPriceToFirebase(model){
  let ref = firebase.database().ref('items');
  let parsedName = model.market_hash_name.split('™').join('%E2%84%A2');
  var url = `http://steamcommunity.com/market/priceoverview/json/?key=8EA076358F99E86424EC22B64ADE01C3&appid=730&currency=3&market_hash_name=${parsedName}`;

  request.get(url, function (error, steamHttpResponse, steamHttpBody) {
    var parsed = JSON.parse(steamHttpBody);
    model.price = parsed.lowest_price;
    ref.child(model.market_hash_name).set(model);
    return parsed.lowest_price;
    })
}

function savePrice(obj, name) {
  var pricesRef = firebase.database().ref('items');
  var parsed = JSON.parse(obj);
  var model = {
    name: name,
    lowest_price: parsed.lowest_price,
    median_price: parsed.median_price,
    volume: parsed.volume
  }
  pricesRef.child(name).set(model);
  return model;
}




module.exports = router;