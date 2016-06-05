
module.exports = function(models) {
	var bodyparser = require('body-parser');
	var express = require('express');
	var router = express.Router();
	// mongoose-model
	var Translation = models.Translation;
	
	router.use(bodyparser.json());
	
	router.get('/', function(req, res) {
		var q = req.query['q'];
		res.send(
			{ result: [
				{	texts: [
					{ 	lang:"de_de",
						text:q 
					},
					{ 	lang:"en_US",
						text: q + " -  translated"
					} ]},
				{ texts: [
					{ 	lang:"de_de",
						text: q+q 
					},
					{ 	lang:"en_US",
						text: q + q + " -  translated"
					}
				]}
			] }
		
				
				);
	});
	
	
	return router;
}