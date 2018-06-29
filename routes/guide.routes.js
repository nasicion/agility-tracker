var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Guide = require('../models/Guide.js');


/* GET ALL OwnerS */
router.get('/', function(req, res, next) {
  Owner.find(function(err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* GET SINGLE Owner BY ID */
router.get('/:id', function(req, res, next) {
  Owner.findById(req.params.id, function(err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* filter Owners */
router.get('/filter/:filter', function(req, res, next) {
//https://stackoverflow.com/questions/41390758/mongoose-find-document-with-two-fields-with-one-search-parameter?rq=1
  var query = {$or:[
      {firstname:{$regex: req.params.filter, $options: 'i'}},
      {lastname:{$regex: req.params.filter, $options: 'i'}}
    ]}

  Owner.find(query, function(err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE Owner */
router.post('/', function(req, res, next) {
  Owner.create(new Owner(req.body), function(err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE Owner */
router.put('/:id', function(req, res, next) {
  Owner.findByIdAndUpdate(req.params.id, req.body, function(err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE BOOK */
router.delete('/:id', function(req, res, next) {
  Owner.findByIdAndRemove(req.params.id, req.body, function(err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
