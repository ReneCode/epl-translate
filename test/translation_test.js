var assert = require('assert');

var app = require('../server');
var superagent = require('superagent');

var PORT = 3010;
var URL_ROOT = 'http://localhost:' + PORT;

describe('REST translation', function(){
	var server;
	
	before(function(done) {
		server = app({logging:false}).listen(PORT, function() {
			done();
		});
	});
	
	after(function(done) {
		server.close(function() {
            done();
        });
	});
	
	it('can be called', function(done) {
		var url = URL_ROOT + '/api/translation';
		superagent.get(url, function(err, res) {
			assert.ifError(err);
			done();
		});
	});
});




