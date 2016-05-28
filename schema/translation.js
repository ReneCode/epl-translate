
var mongoose = require('mongoose');

module.exports = function() {
	// _id: false
	// to not create a _id property to each texts-array-object-element
	var translationSchema = new mongoose.Schema({
		comment: String,
		texts: [{
			_id: false,
			lang: String,
			text: String
		}]
	});
	return translationSchema;
}