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

    if (!exists) {
      request.get(url, function (error, steamHttpResponse, steamHttpBody) {
        var output = savePrice(steamHttpBody, req.body.name)
        res.send(output);
      })
    } else {
      res.send(snapshot.val());
    }
  })

  var url = `http://steamcommunity.com/market/priceoverview/json/?key=8EA076358F99E86424EC22B64ADE01C3&appid=730&currency=3&market_hash_name=${req.body.name}`;

  let response = {};

});

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

router.post('/update_prices', function (req, res) {
  console.log();
  console.log();
  console.log();
  console.log();
  console.log();
  console.log(req.body.items.length);
  let items = req.body.items;
  let i = 0;
  let ref = firebase.database().ref('items1');

  // console.log(items[0])
  let interval = setInterval(() => {
    console.log(i, '/', items.length - 1);
    // if(i>items.length-1){
    if (i >= 1) {
      clearInterval(interval);
    } else {
      // console.log();
      // console.log();
      // console.log();
      // console.log();
      // console.log();
      // console.log(items[i].name);
      // console.log(items[i].market_hash_name);
      // console.log(items[i].name_color);
      // console.log(items[i].icon_url);
      let model = {
        name: items[i].name,
        market_hash_name: items[i].market_hash_name,
        name_color: items[i].name_color,
        icon_url: items[i].icon_url,
        // price: getThitPrice(items[i].market_hash_name)
      }

      ref.child(items[i].name).set(model);
    }
    i++;
  }, 100)




  // var url = `http://steamcommunity.com/market/priceoverview/json/?key=8EA076358F99E86424EC22B64ADE01C3&appid=730&currency=3&market_hash_name=${req.body.name}`;

  // request.get(url, function (error, steamHttpResponse, steamHttpBody) {
  //   var output = savePrice(steamHttpBody,req.body.name)
  //   res.send(output);
  // })
  res.send('Done');

});

async function getThitPrice(name){
  let parsedName = name.split('™').join('%E2%84%A2');
  // console.log('asdasdasdsadsadsadasd',parsedName)
  var url = `http://steamcommunity.com/market/priceoverview/json/?key=8EA076358F99E86424EC22B64ADE01C3&appid=730&currency=3&market_hash_name=${parsedName}`;

  request.get(url, function (error, steamHttpResponse, steamHttpBody) {
    var parsed = JSON.parse(steamHttpBody);
    // console.log(parsed.lowest_price)
    return parsed.lowest_price;
    })
    return name;
}


module.exports = router;