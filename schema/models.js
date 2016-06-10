
var mongoose = require('mongoose');

module.exports = function() {
	// that ip adress is my docker-mongo-container
	var localhost = '192.168.99.100';
	localhost = 'localhost';
	var connectUrl = 'mongodb://' + localhost + ':27017/epltranslate';	
	mongoose.connect(connectUrl);
	var db = mongoose.connection;
	
	db.once('open', function() {		
		var admin = new mongoose.mongo.Admin(mongoose.connection.db);
  		admin.buildInfo(function (err, info) {
  		});
	});
	
	var translation = mongoose.model('Translation', require('./translation')(), 'translation');
	
	var models = {
		Translation: translation
	}
	
	return models;
};

