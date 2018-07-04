var mongoose = require('mongoose');
//https://medium.com/hexient-labs/pagination-with-mongoose-b00c5207371e
var mongoosePaginate = require('mongoose-paginate');

var GuideSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  identityDocument: { type: String, index: { unique: true }},
  gender: String,
  birthdate: { type: Date, default: Date.now },
  email: String,
  phone: String
});

GuideSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Guide', GuideSchema);
