var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Guide = require('../models/Guide.js');
var multer  = require('multer');
var upload = multer({ dest: '/tmp/'});


/* GET ALL OwnerS */
router.get('/', function(req, res, next) {
  // console.log(req.query.pageSize);

  if(req.query.page) {
    var options = {};
    options.page = Number(req.query.page);
    if(req.query.pageSize)
      options.limit = Number(req.query.pageSize);
    Guide.paginate({}, options,
      function(err, guides) {
        if(err) return next(err);
        guides.guides = guides.docs;
        guides.docs = undefined;
        res.json(guides);
      });
  } else {
    Guide.find(function(err, guides) {
      if(err) return next(err);
      var response = {"guides" : guides};
      res.json(response);
    });
  }
});

/* GET SINGLE Owner BY ID */
router.get('/:id', function(req, res, next) {
  Guide.findById(req.params.id, function(err, post) {
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

  Guide.find(query, function(err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE Owner */
router.post('/', function(req, res, next) {
  Guide.create(new Guide(req.body), function(err, post) {
    if (err) {
      console.log('Error');
      console.log(err);
      return next(err);
    }
    res.json(post);
  });
});

/* UPDATE Owner */
router.put('/:id', function(req, res, next) {
  Guide.findByIdAndUpdate(req.params.id, req.body, function(err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE Guide Picture */
router.post('/:id/picture', upload.single('file'), function(req, res, next) {
  console.log('Updating picture for guide ' + req.params.id);
  if (!req.file) {
    console.log("No file received");
    return res.send({
      success: false
    });

  } else {
    console.log('file received');
    return res.send({
      success: true
    })
  }
  Guide.findByIdAndUpdate(req.params.id, req.body, function(err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE BOOK */
router.delete('/:id', function(req, res, next) {
  Guide.findByIdAndRemove(req.params.id, req.body, function(err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
