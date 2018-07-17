var mongoose = require('mongoose');

var Course = require('Course');
var ObjectIdSchema = mongoose.Schema.ObjectId;
var ObjectId = mongoose.Types.ObjectId;

var CourseSchema = new mongoose.Schema({
  name: {type: String},
  date: {type: Date, required: true},
  courses: [{type: Schema.Types.ObjectId, ref: 'Course'}]

});

module.exports = mongoose.model('Competition', CompetitionSchema);
