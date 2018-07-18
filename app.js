var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
// var fileUpload = require('express-fileupload');

var dogRoutes = require('./routes/dog.routes');
var guideRoutes = require('./routes/guide.routes');
var breedRoutes = require('./routes/breed.routes');
var app = express();

// since it gets used a lot....
let distDir = path.join(__dirname,'dist')

app.use(logger('dev'));
// app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));

app.use(express.static(path.join(__dirname, 'dist')));
app.use('/dog', express.static(path.join(__dirname, 'dist')));
app.use('/api/dog', dogRoutes);
app.use('/api/guide', guideRoutes);
app.use('/api/breed', breedRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(err);
  // render the error page
  res.status(err.status || 500);
  //res.render('error');
  res.json(err);
});

//CORS Configuration
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});


//Database connection
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/agility-tracker', {
    promiseLibrary: require('bluebird') })
      .then(() =>  console.log('connection succesful'))
      .catch((err) => console.error(err));

module.exports = app;
