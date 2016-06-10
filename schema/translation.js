
var mongoose = require('mongoose');

module.exports = function() {
	// _id: false
	// to not create a _id property to each texts-array-object-element
	var translationSchema = new mongoose.Schema({
		comment: String,
		text: {
			_id: false,
			
			cs_CZ: String,
			da_DK: String,
			de_DE: String,
			en_US: String,
			es_ES: String,
			fi_FI: String,
			fr_FR: String,
			hu_HU: String,
			it_IT: String,
			ja_JP: String,
			ko_KR: String,
			nl_NL: String,
			pl_PL: String,
			pt_BR: String,
			pt_PT: String,
			ru_RU: String,
			sk_SK: String,
			sv_SE: String,
			tr_TR: String,
			zh_CN: String
	
		}
	});
	return translationSchema; 
}