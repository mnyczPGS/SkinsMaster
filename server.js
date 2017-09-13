const express = require('express');

let app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static('dist'));

app.listen(3000,function() {
  console.log('Express server on ' + PORT);
})