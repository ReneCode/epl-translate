var assert = require('assert');

var app = require('../server');
var superagent = require('superagent');
var serveroption = require('./testserveroption.json');

var PORT = 3010;
var URL_ROOT = 'http://localhost:' + PORT + '/api/translation/';

describe('REST translation', function(){
	var server;
	
	before(function(done) {
		server = app(serveroption).listen(PORT, function() {
			done();
		});
	});
	
	after(function(done) {
		server.close(function() {
            done();
        });
	});
	
	it('can be called', function(done) {
		superagent.get(URL_ROOT, function(err, res) {
			assert.ifError(err);
			done();
		});
	});


	describe('GET', function() {
		var sampleData;

		it ('all', function(done) {
			superagent.get(URL_ROOT)
			.end(function(err, res) {
				assert.ifError(err);
				assert(res.body.length > 0);
				sampleData = res.body;
				done(); 
			});
		});

		it ('get "hallo"', function(done) {
			superagent.get(URL_ROOT + sampleData[0]._id)
			.end(function(err, res) {
				assert.equal(res.body._id, sampleData[0]._id);
				assert.equal(res.body.de_DE, sampleData[0].de_DE);
				done();
			})
		})
	});

	describe('POST', function() {
		it ('with invalid data', function(done) {
			superagent.post(URL_ROOT)
			.send({x:42})
			.end(function(err, res) {
				assert(err != undefined);
				assert.equal(err.status, 400);
				done();
			})
		});

		it ('with valid data', function(done) {
			var mlString = {
				text: {
					de_DE: "hallo",
					en_US: "hello",
					fr_FR: "bon jour",
					zh_CN: "%0 常规定向控制阀，%1 个连接点"
				},
				comment: "that is a comment"
			};
			superagent.post(URL_ROOT)
			.send(mlString)
			.end(function(err, res) {
				assert.ifError(err);
				assert.deepEqual(res.body.text, mlString.text);
				assert.deepEqual(res.body.comment, mlString.comment);

				done();
			})
		});

		it ('remove bad languages', function(done) {
			var mlString = {
				text: {
					de_DE: "hallo",
					en_US: "hello",
					fr_FR: "bon jour",
					xy_XY: "invalid"
				},
				comment: "that is a comment"
			};
			superagent.post(URL_ROOT)
			.send(mlString)
			.end(function(err, res) {
				assert.ifError(err);
				assert.equal(undefined, res.body.text.xy_XY);
				assert.equal("bon jour", res.body.text.fr_FR);
				done();
			})
		});
	});




});




