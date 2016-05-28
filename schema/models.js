
var mongoose = require('mongoose');

module.exports = function() {
	var connectUrl = 'mongodb://localhost:27017/epltranslate';	
	mongoose.connect(connectUrl);
	var db = mongoose.connection;
	
	db.once('open', function() {
		console.log("connected to mongo");
	});
	
	
	var translation = mongoose.model('Translation', require('./translation')(), 'translation');
	
	var models = {
		Translation: translation
	}
	
	return models;
};

