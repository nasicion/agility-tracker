var mongoose = require('mongoose');
//https://medium.com/hexient-labs/pagination-with-mongoose-b00c5207371e
var mongoosePaginate = require('mongoose-paginate');
var ObjectIdSchema = mongoose.Schema.ObjectId;
var ObjectId = mongoose.Types.ObjectId;

var RunSchema = new mongoose.Schema({
  dog: {type: String, required: true},
  guide: {type: String, required: true},
  course: {type: String, requiered: true}
});

RunSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Run', RunSchema);
