var mongoose = require('mongoose');
var Guide = require('../models/Guide.js');
var Schema = mongoose.Schema;

var DogSchema = new mongoose.Schema({
  id: {type: Number, index:true, unique: true, sparse: true}, //sparse indicates that the unique restratint only applies to non null values
  name: String,
  pedigreeName: String,
  pedigree: {type: String, index:true, unique: true, sparse: true}, //sparse
  birthdate: { type: Date, default: Date.now },
  breed: String,
  owner: {type: Schema.Types.ObjectId, ref: 'Guide'}
});

module.exports = mongoose.model('Dog', DogSchema);
