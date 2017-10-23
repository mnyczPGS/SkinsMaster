var path = require('path')
, router = require('express').Router()
, config = require('../../../config')
, passport = require('passport')
, request = require('request')
, firebase = require('firebase')
, updatePrices = require('../ACTIONS/updatePrices');



router.post('/inventory', function (req, res) {
  console.log('req', req.body.id)
  var url = `http://steamcommunity.com/inventory/${req.body.id}/730/2?l=polish&count=5000`;
  
  request.get(url, function (error, steamHttpResponse, steamHttpBody) {
    res.send(steamHttpBody);
  });
});

router.post('/price', function (req, res) {
  let ref = firebase.database().ref('items').child(req.body.name);

  ref.once('value', function(snapshot) {
    var exists = (snapshot.val() !== null);
    
    if(!exists){
      request.get(url, function (error, steamHttpResponse, steamHttpBody) {
        var output = updatePrice(steamHttpBody,req.body.name)
        res.send(output);
      })
    } else {
      res.send(snapshot.val());
    }
  })

  var url = `http://steamcommunity.com/market/priceoverview/json/?key=8EA076358F99E86424EC22B64ADE01C3&appid=730&currency=3&market_hash_name=${req.body.name}`;
  
  let response = {};
  
});

function updatePrice(obj,name){
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