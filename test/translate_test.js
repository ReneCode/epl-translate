var assert = require('assert');

var app = require('../server');
var superagent = require('superagent');

var PORT = 3010;
var URL_TRANSLATE = "http://localhost:" + PORT + "/api/translate";

describe('REST translate', function(){
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

    describe('general', function() {
        it('can be called', function(done) {
            superagent.get(URL_TRANSLATE, function(err, res) {
                assert.ifError(err);
                done();
            });
        });
    });
    
    describe('translate text', function() {
        it ('1:1', function(done) {
            var para = { source: "de_DE", target:"en_US", text:"Klemme"};
            superagent.get(URL_TRANSLATE)
            .query(para)
            .end( function(err, res) {
                assert.ifError(err);
                assert.equal(res.body.length, 1);
                var trans = res.body[0];
                assert.equal(trans.en_US, "terminal");
                done();
                
            });
        });

        it ('1:N', function(done) {
            var para = { source: "de_DE", target:"en_US", text:"Tisch"};
            superagent.get(URL_TRANSLATE)
            .query(para)
            .end( function(err, res) {
                assert.ifError(err);
                assert.equal(res.body.length, 2);
                var trans = res.body;
                assert.equal(trans[0].en_US, "desk");
                assert.equal(trans[1].en_US, "table");
                done();
                
            });
        });

        it ('1:nothing', function(done) {
            var para = { source: "de_DE", target:"en_US", text:"dummy"};
            superagent.get(URL_TRANSLATE)
            .query(para)
            .end( function(err, res) {
                assert.ifError(err);
                assert.equal(res.body.length, 0);
                done();
                
            });
        });

        it ('multi-target 1:1', function(done) {
            var para = { source: "en_US", target:["de_DE", "fr_FR"], text:"table"};
            superagent.get(URL_TRANSLATE)
            .query(para)
            .end( function(err, res) {
                assert.ifError(err);
                assert.equal(res.body.length, 1);
                var trans = res.body[0];
                assert.equal(trans.de_DE, "Tisch");
                assert.equal(trans.fr_FR, "table");
                done();
                
            });
        });
    });
});




