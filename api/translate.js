
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
		console.log("X:", text, source, target);
		Translation.find({texts: {$elemMatch: {lang:source, text:text}}}).exec(function(err, data) {
			if (err) {
				res.status(500).send("query error");
			}
			else {
				var resultTexts = [];
				console.log(data);
				/*
				data.forEach( function(d) {
					var oneResult = {texts:[]};
					d.texts.forEach(function(txt) {
						if (txt.lang === target) {
							oneResult.texts.push( { lang: txt.lang, text:txt.text} );
						}
					});
					resultTexts.push(oneResult);
				}); */ 
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