// PACKAGES //
var path = require('path')
  , fs = require('fs')
  , cors = require('cors')
  , express = require('express')
  , bodyParser = require("body-parser")
  , passportSteam = require('passport-steam')
  , session = require('express-session')
  , passport = require('passport');

// IMPORT //
var apiRoutes = require('./routes/api');
var indexRoutes = require('./routes/index');
var userRoutes = require('./routes/API/user');
var config = require('./config');


// CREATE APP //
var app = express();
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(session({
  secret: 'qwertyuiop',
  name: 'skinsmaster',
  resave: true,
  saveUninitialized: true}));
  app.use(passport.initialize());
  app.use(passport.session());

// VIEW ENGINE //
app.set('view engine', 'html');
app.engine('html', function (path, options, callbacks) {
  fs.readFile(path, 'utf-8', callback);
});

app.use(express.static(path.join(__dirname, '../dist')));

var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// ROUTES //
app.use('/api/v1/', cors(corsOptions), apiRoutes)
// app.use('/api/v1/',cors(corsOptions), userRoutes)
// app.post('/test',function(req,res){
//   var user_name=req.body.id;
//   var password=req.body.id;
//   console.log("User name = "+user_name+", password is "+password, req.body);
//   res.send("yes");
// });
app.use('/*', indexRoutes);

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
});

module.exports = app;