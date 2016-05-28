
module.exports = function(models) {
	var Translation = models.Translation;
	
	// remove all old data
	Translation.remove({}, function()
	{
		var t1 = new Translation({ texts: [
			{lang:'de_DE', text:"Kleme"},
			{lang:'en_US', text:"Terminal"}
			
		]});
		t1.save();
		var t2 = new Translation({ texts: [
			{lang:'de_DE', text:"Verbindung"},
			{lang:'en_US', text:"Connection"}
			
		]});
		t2.save();
	})
	
}