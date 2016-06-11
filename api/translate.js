
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
		var q = req.query['q'];
		if (!Array.isArray(target)) {
			target = [ target ];
		}
		// TODO check valid target 

		// find in nested object text 
		//  { text.de_DE: "searchText" }
		var filter = {};
		filter[ 'text.' + source] = text;

		if (q) {
			var regex = new RegExp(q, "i");
			filter[ 'text.' + source] = regex;
		}

		Translation.find(filter).exec(function(err, data) {
//		Translation.find({texts: {$elemMatch: {lang:source, text:text}}}).exec(function(err, data) {
			if (err) {
				res.status(500).send("query error");
			}
			else {
				var resultTexts = [];
				data.forEach( function(d) {
					var oneResult = {};
					oneResult[source] = d.text[source];
					for (var i =0; i<target.length; i++) {
						var language = target[i]
						oneResult[language] = d.text[language];
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