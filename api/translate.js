
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
			{ languages: [ "de_de", "en_US" ],
			  translations: [
				  { texts:[ q,      q+"translated" ] },
				  { texts:[ q+q,    q+q+"translated"]}
			  ]
			}
			);
	});
	
	
	return router;
}