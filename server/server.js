// PACKAGES //
var path = require('path');
var fs = require('fs');
var cors = require('cors');
var express = require('express');

// IMPORT //
var steamRoutes = require('./routes/steamRoutes');
var indexRoutes = require('./routes/index');
var config = require('./config');

// CREATE APP //
var app = express();

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
app.use('/api/v1/',cors(corsOptions), steamRoutes)
app.use('/*', indexRoutes);

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
});

module.exports = app;