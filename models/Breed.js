var mongoose = require('mongoose');

var BreedSchema = new mongoose.Schema({
  name: String
});

module.exports = mongoose.model('Breed', BreedSchema);
