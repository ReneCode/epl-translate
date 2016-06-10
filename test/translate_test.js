var assert = require('assert');

var mongoose = require('mongoose');

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
    
    describe('translate word', function() {
        it ('can translate 1:1', function(done) {
            var para = { source:"de_DE", target:"en_US", text:"Klemme"};
            superagent.get(URL_TRANSLATE)
            .query(para)
            .end( function(err, res) {
                assert.ifError(err);
                assert.equal(res.body.length, 1);
                assert.equal(res.body[0].texts[0].lang, "en_US");
                assert.equal(res.body[0].texts[0].text, "terminal");
                done();
                
            });
        }) 
    });
});




