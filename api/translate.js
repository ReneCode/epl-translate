
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
		// find in nested object text 
		//  { text.de_DE: "searchText" }
		var filter = {};
		filter[ 'text.' + source] = text;
		Translation.find(filter).exec(function(err, data) {
//		Translation.find({texts: {$elemMatch: {lang:source, text:text}}}).exec(function(err, data) {
			if (err) {
				res.status(500).send("query error");
			}
			else {
				var resultTexts = [];
				data.forEach( function(d) {
//					console.log("X:", d);
					var oneResult = {};
					for (var prop in d.text) {
						if (prop === target) {
							oneResult[prop] = d.text[prop];
						}
					}
					resultTexts.push(oneResult);
				});  
				res.json(resultTexts);
			}
		});
		
		/*
		res.send(
			{ languages: [ "de_de", "en_US" ],
			  translations: [
				  { texts:[ text + source, 	text + target ] },
				  { texts:[ text + text,    text + text + "translated"]}
			  ]
			}
			);
			*/
	});
	
	
	return router;
}