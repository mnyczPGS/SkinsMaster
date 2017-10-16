var path = require('path');
var router = require('express').Router();
var config = require('../config');
var request = require('request');

router.get('/steam', function (req, res) {
  res.send('Saved?');
});

router.post('/steam', function (req, res) {
  var url = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${config.key}&steamids=${config.id}`;
  console.log(url);
  request.get(url, function (error, steamHttpResponse, steamHttpBody) {
    res.send(steamHttpBody);
  });
})

module.exports = router;