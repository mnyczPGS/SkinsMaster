var path = require('path')
  , router = require('express').Router()
  , config = require('../../config')
  , passport = require('passport')
  , request = require('request')
  , LocalStrategy = require('passport-local').Strategy
  , SteamStrategy = require('./../../package/passport-steam').Strategy;


  passport.serializeUser(function (user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function (obj, done) {
    done(null, obj);
  });
  
  passport.use(new SteamStrategy({
    returnURL: 'https://skinsmaster.herokuapp.com/api/v1/user/auth/return',
    realm: '/',
    apiKey: config.key
  },
    function (identifier, profile, done) {
      // asynchronous verification, for effect...
      process.nextTick(function () {
  
        // To keep the example simple, the user's Steam profile is returned to
        // represent the logged-in user.  In a typical application, you would want
        // to associate the Steam account with a user record in your database,
        // and return that user instead.
        profile.identifier = identifier;
        return done(null, profile);
      });
    }
  ));
  

router.get('/auth/login', 
passport.authenticate('steam', { failureRedirect: '/' }),
function (req, res) {
  console.log('login')
  req.login();
  });

// router.get('/auth/return',
//   passport.authenticate('steam', { failureRedirect: '/' }),
//   function (req, res) {
//     res.redirect('/');
//   });

router.get('/auth/account', ensureAuthenticated, function (req, res) {
  res.send(req.user);
});

router.get('/auth/return',
  passport.authenticate('steam', { failureRedirect: '/login' }),
  function (req, res) {
  config.enableDev?res.redirect('http://localhost:3000/'):res.redirect('/');
  });

router.get('/auth/logout', function(req, res){
  console.log('logout');
  req.logout();
  res.redirect('/');
});

router.get('/test', function (req, res) {
  console.log('logout', res);
  res.send('Hello!');
});

router.post('/inventory', function (req, res) {
  console.log('req', req.body.id)
  var url = `http://steamcommunity.com/inventory/${req.body.id}/730/2?l=polish&count=5000`;

  request.get(url, function (error, steamHttpResponse, steamHttpBody) {
    res.send(steamHttpBody);
  });
});

router.post('/price', function (req, res) {
  console.log(`http://steamcommunity.com/market/priceoverview/json/?key=8EA076358F99E86424EC22B64ADE01C3&appid=730&currency=3&market_hash_name=${req.body.name}`)
  var url = `http://steamcommunity.com/market/priceoverview/json/?key=8EA076358F99E86424EC22B64ADE01C3&appid=730&currency=3&market_hash_name=${req.body.name}`;

  request.get(url, function (error, steamHttpResponse, steamHttpBody) {
    res.send(steamHttpBody);
  });
});

router.post('/steam', function (req, res) {
})

function ensureAuthenticated(req, res, next) {

  if (req.isAuthenticated()) { return next(); }
  res.send(req);
  res.redirect('/');
}

module.exports = router;