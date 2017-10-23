var path = require('path');
var router = require('express').Router();
var config = require('../../config');
var request = require('request');
var cors = require('cors');

var user = require('./API/user');
var inventory = require('./API/inventory');

// router.get('/userGame', function (req, res) {
//   console.log('req',req.body)
//   var url = `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${config.key}&steamid=${config.id}&include_appinfo=1`;
//   request.get(url, function (error, steamHttpResponse, steamHttpBody) {
//     res.send(steamHttpBody);
//   });
// });

var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

router.use('/user', cors(corsOptions), user);
router.use('/inventory', cors(corsOptions), inventory);

router.get('/steam/:steamid', function (req, res) {
  var id = req.params.steamid
  console.log('steam id',id);
  var url = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${config.key}&steamids=${id}`;
  request.get(url, function (error, steamHttpResponse, steamHttpBody) {
    res.send(steamHttpBody);
  });
})

module.exports = router;