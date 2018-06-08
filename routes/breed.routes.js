var express = require('express');
var router = express.Router();
var fs = require('fs');
var breeds = JSON.parse(fs.readFileSync('data/breeds.json','utf8'));

/* GET SINGLE BOOK BY ID */
router.get('/', function(req, res, next) {
  res.json(breeds.breeds);
});

module.exports = router;
