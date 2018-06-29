var mongoose = require('mongoose');
var ObjectIdSchema = mongoose.Schema.ObjectId;
var ObjectId = mongoose.Types.ObjectId;

var GuideSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  motherLastname: String,
  identityDocument: { type: String, index: { unique: true }},
  birthdate: { type: Date, default: Date.now },
  email: String,
  phone: String
});

module.exports = mongoose.model('Guide', GuideSchema);
