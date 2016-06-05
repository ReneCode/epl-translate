
module.exports = function(models) {
	var bodyparser = require('body-parser');
	var express = require('express');
	var router = express.Router();
	// mongoose-model
	var Translation = models.Translation;
	
	router.use(bodyparser.json());
	
	router.get('/', function(req, res) {
		var text = req.query['text'];
		var source = req.query['source'];
		var target = req.query['target'];
		
		res.send(
			{ languages: [ "de_de", "en_US" ],
			  translations: [
				  { texts:[ text + source, 	text + target ] },
				  { texts:[ text + text,    text + text + "translated"]}
			  ]
			}
			);
	});
	
	
	return router;
}