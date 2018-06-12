var mongoose = require('mongoose');

var DogSchema = new mongoose.Schema({
  id: {type: Number, index:true, unique: true, sparse: true}, //partialFilterExpression ensures that null values doesn't count as repeated values
  name: String,
  pedigreeName: String,
  pedigree: String,
  birthdate: { type: Date, default: Date.now },
  breed: String,
  owner: String
});

module.exports = mongoose.model('Dog', DogSchema);
