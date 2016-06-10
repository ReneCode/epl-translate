


function createSampleData(translation) {
	// get sample data from json-file
	translation.insertMany( require('./sample-translations.json'))
	.then(function(data) {
		console.log("created sample data");
	})
	.catch(function(err) {
		console.log("err", err);
	});
}

module.exports = function(models) {
	var Translation = models.Translation;
		/*
	Translation.find({}).exec()
	.then(function(data) {
		if (data.length == 0) {
			createSampleData(Translation);			
		}
	})
	.catch(function(err) {
		console.log("error:", err);
	});
	*/

	// remove all
	Translation.remove({}, function(data) {
		createSampleData(Translation);
	});
	
}


