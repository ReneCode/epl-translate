
var ObjectId = require('mongoose').Types.ObjectId;

// routing of /api/translation

function getIntValue(req, name, defaultVal) {
	var val = parseInt(req.query[name]);
	if (isNaN(val)) {
		val = defaultVal;
	}
	return val;
}

function makeValidTranslation(req) {
	var validTextProperties = [
		"cs_CZ",
		"da_DK",
		"de_DE",
		"en_US",
		"es_ES",
		"fi_FI",
		"fr_FR",
		"hu_HU",
		"it_IT",
		"ja_JP",
		"ko_KR",
		"nl_NL",
		"pl_PL",
		"pt_BR",
		"pt_PT",
		"ru_RU",
		"sk_SK",
		"sv_SE",
		"tr_TR",
		"zh_CN",
	]
	var text = req.body.text;
	if (!text) {
		return undefined;
	}
	if (!typeof(text)  == 'object') {
		return undefined;
	}
	if (text.length == 0) {
		return undefined;
	}
	var bAtLeastOneValidText = false;
	var translation = { text: {} };
	for (var prop in text) {
		if (validTextProperties.indexOf(prop) >= 0) {
			translation.text[prop] = text[prop]
			bAtLeastOneValidText = true;
		}
	}
	if (!bAtLeastOneValidText)
	{
		return undefined;
	}
	translation.comment = req.body.comment;
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
		Translation.findOne({_id:req.params.id}, function(err, data) {
			res.json(data);
		});
	});
	
	router.post('/', function(req, res) {
		var translation = makeValidTranslation(req);
		if (translation) {
			Translation.create(translation, function(err, data) {
				if (err) {
					res.status(400).send("can't store data");
				}
				else {
					res.send(data);
				}
			});
		}
		else {
			res.status(400).send('invalid data');
		}
	});

	return router;
}