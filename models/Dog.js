var mongoose = require('mongoose');

var DogSchema = new mongoose.Schema({
  id: {type: Number, index:true, unique: true, sparse: true}, //sparse indicates that the unique restratint only applies to non null values
  name: String,
  pedigreeName: String,
  pedigree: {type: String, index:true, unique: true, sparse: true}, //sparse
  birthdate: { type: Date, default: Date.now },
  breed: String,
  owner: String
});

module.exports = mongoose.model('Dog', DogSchema);
