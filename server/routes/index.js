var path = require('path');
var router = require('express').Router();


router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,  '../../dist', 'index.html'));
});

module.exports = router;