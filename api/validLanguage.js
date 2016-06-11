

module.exports = function(language) {
    var validLanguages = [
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
	];

    return validLanguages.indexOf(language) >= 0;
};


