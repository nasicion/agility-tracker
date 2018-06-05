var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Dog = require('../models/Dog.js');


/* GET ALL DOGS */
router.get('/', function(req, res, next) {
  Dog.find(function(err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* GET SINGLE DOG BY ID */
router.get('/:id', function(req, res, next) {
  Dog.findById(req.params.id, function(err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* filter dogs */
router.get('/filter/:filter', function(req, res, next) {
//https://stackoverflow.com/questions/41390758/mongoose-find-document-with-two-fields-with-one-search-parameter?rq=1
  var query = {$or:[
      {name:{$regex: req.params.filter, $options: 'i'}},
      {pedigreeName:{$regex: req.params.filter, $options: 'i'}},
      {breed:{$regex: req.params.filter, $options: 'i'}},
      {owner:{$regex: req.params.filter, $options: 'i'}}
    ]}

  Dog.find(query, function(err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE DOG */
router.post('/', function(req, res, next) {
  Dog.create(req.body, function(err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE DOG */
router.put('/:id', function(req, res, next) {
  Dog.findByIdAndUpdate(req.params.id, req.body, function(err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE BOOK */
router.delete('/:id', function(req, res, next) {
  Dog.findByIdAndRemove(req.params.id, req.body, function(err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
