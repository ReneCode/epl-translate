
var mongoose = require('mongoose');

module.exports = function(option) {
	// that ip adress is my docker-mongo-container
	var mongo_server = '192.168.99.100';
	var database = 'epltranslate';
	switch (option.node_env) {
		case "testing":
			database = 'epltest';
			break;

		case "production":
			mongo_server = 'localhost';
			break;
	}

	var connectUrl = 'mongodb://' + mongo_server + ':27017/' + database;	

	//console.log("mongo URL:", connectUrl);

	mongoose.Promise = require('bluebird');

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

