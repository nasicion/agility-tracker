var mongoose = require('mongoose');

var DogSchema = new mongoose.Schema({
  _id: Number,
  name: String,
  pedigreeName: String,
  pedigree: String,
  birthdate: { type: Date, default: Date.now },
  breed: String,
  owner: String
});

module.exports = mongoose.model('Dog', DogSchema);
