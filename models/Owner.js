var mongoose = require('mongoose');
var ObjectIdSchema = mongoose.Schema.ObjectId;
var ObjectId = mongoose.Types.ObjectId;

var OwnerSchema = new mongoose.Schema({
  _id: {type:ObjectIdSchema, default: new ObjectId()},
  name: String,
  lastname: String,
  motherLastname: String,
  identityDocument: { type: String, index: { unique: true }},
  birthdate: { type: Date, default: Date.now },
  email: String,
  phone: String
});

module.exports = mongoose.model('Owner', OwnerSchema);
