
// routing of /api/translation


function getIntValue(req, name, defaultVal) {
	var val = parseInt(req.query[name]);
	if (isNaN(val)) {
		val = defaultVal;
	}
	return val;
}

function makeValidTranslation(req) {
	var texts = req.body.texts;
	if (!texts) {
		return undefined;
	}
	if (!Array.isArray(texts)) {
		return undefined;
	}
	if (texts.length == 0) {
		return undefined;
	}
	// TODO: check is texts contains at least one
	// { lang: "...", text: "..."}  entry
	var translation = { texts: texts, comment: req.body.comment };
	return translation;
}

module.exports = function(models) {
	var bodyparser = require('body-parser');
	var express = require('express');
	var router = express.Router();
	var Translation = models.Translation;
	
	router.use(bodyparser.json());
	
	router.get('/', function(req, res) {
		var limit = getIntValue(req, "limit", 100);
		Translation.find().limit(limit).exec(function(err, data) {
			res.json(data);
		})
	});
	
	router.get('/:id', function(req, res) {
		Translation.findOne({_id:req.params.id}).exec(function(err, data) {
			res.json(data);
		})
	});
	
	router.post('/', function(req, res) {
		var translation = makeValidTranslation(req);
		if (translation) {
			Translation.create(translation, function(err, data) {
				if (err) {
					res.send("error");
				}
				else {
					res.send(data);
				}
			});
		}
		else {
			res.send("invalid");
		}
	});

	return router;
}