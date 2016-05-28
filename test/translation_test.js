var assert = require('assert');

var app = require('../server');
var superagent = require('superagent');

var URL_ROOT = 'http://localhost:3010';

describe('REST translation', function(){
	var server;
	
	before(function(done) {
		server = app().listen(3010);
		done();
	});
	
	after(function() {
		server.close();
	});
	
	it('can be called', function(done) {
		var url = URL_ROOT + '/api/translation';
		superagent.get(url, function(err, res) {
			assert.ifError(err);
			done();
		});
	});
});




