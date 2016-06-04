
module.exports = function(models) {
	var bodyparser = require('body-parser');
	var express = require('express');
	var router = express.Router();
	// mongoose-model
	var Translation = models.Translation;
	
	router.use(bodyparser.json());
	
	router.get('/', function(req, res) {
		var q = req.query['q'];
		console.log(q);
		res.send({text: q + " -  translated"});
	});
	
	
	return router;
}