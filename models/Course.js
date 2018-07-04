var mongoose = require('mongoose');
//https://medium.com/hexient-labs/pagination-with-mongoose-b00c5207371e
var mongoosePaginate = require('mongoose-paginate');
var Run = require('Run');
var ObjectIdSchema = mongoose.Schema.ObjectId;
var ObjectId = mongoose.Types.ObjectId;

var CourseSchema = new mongoose.Schema({
  date: {type: Date, required: true},
  meters: {type: Number, required: true},
  meterBySecond: {type: Number, requiered: true},
  judge: {type: String, required: true},
  runs: [{type: Schema.Types.ObjectId, ref: 'Run'}]

});

CourseSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Course', CourseSchema);
