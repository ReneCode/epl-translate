
var mongoose = require('mongoose');

module.exports = function() {
	// that ip adress is my docker-mongo-container
	var localhost = '192.168.99.100'
	var connectUrl = 'mongodb://' + localhost + ':27017/epltranslate';	
	console.log(connectUrl);
	mongoose.connect(connectUrl);
	var db = mongoose.connection;
	
	db.once('open', function() {
		console.log("connected to mongo");
		
		var admin = new mongoose.mongo.Admin(mongoose.connection.db);
  		admin.buildInfo(function (err, info) {
	     console.log("MongoDb-Version:", info.version);
  		});
	});
	
	
	var translation = mongoose.model('Translation', require('./translation')(), 'translation');
	
	var models = {
		Translation: translation
	}
	
	return models;
};

