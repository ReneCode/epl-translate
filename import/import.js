"use strict"

var xml2js = require('xml2js');
var fs = require('fs');
var superagent = require('superagent');
var async = require('async');


if (process.argv.length != 3) {
    console.log("node import.js <xml-file>");
    return;
}

var filename = process.argv[2];
console.log("Import: ", filename);


fs.readFile(filename, function (err, data) {
    xml2js.parseString(data, function (err, result) {
        handleJson(result);
    });
});


function handleJson(result) {
    async.eachSeries(result.EplanLanguageDbRoot.TextSection[0].MT,
        function(t, callback) {
            var mlText = convertItem(t);
            if (mlText) {
                uploadText(mlText, callback);
            }
            
        });
/*
    result.EplanLanguageDbRoot.TextSection[0].MT.forEach( function(t) {
        var mlText = convertItem(t);
        if (mlText) {
            uploadText(mlText);
        }
    });
    */
}

function convertItem(item) {
    var ml = { };
    var bOk = false;
    item.T.forEach(function(t) {
        var str = t['_'];
        var lang = t['$']["xml:lang"];

        if (str) {
            ml[lang] = str;
            bOk = true;
        }
//        console.log(lang, str);
    });
    if (bOk) {
        var mlText = { text: ml };
        if (item.C) {
            mlText.comment = item.C;
        }
        return mlText;
    }
    return undefined;
}

function uploadText(mlText, callback) {
//    console.log(mlText);

    // when using docker
    var url = "http://192.168.99.100:3000/api/translation/";
    url = "http://localhost:3000/api/translation/";
    superagent.post(url)
    .send(mlText)
    .end( function(err, result) {
        if (err) {
            console.log(err.code);
            callback(err);
        }
        else {
            console.dir(result.body);
            callback();
        }
    });

}