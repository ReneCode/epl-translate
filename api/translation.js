
// routing of /api/translation

module.exports = function(models) {
	var bodyparser = require('body-parser');
	var express = require('express');
	var router = express.Router();
	var Translation = models.Translation;
	
	router.use(bodyparser.json());
	
	router.get('/', function(req, res) {
		Translation.find().exec(function(err, data) {
			res.json(data);
		})
	});
	
	router.get('/:id', function(req, res) {
		Translation.findOne({_id:req.params.id}).exec(function(err, data) {
			res.json(data);
		})
	});

	return router;
}