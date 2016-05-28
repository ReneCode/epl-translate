
var mongoose = require('mongoose');

module.exports = function() {
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