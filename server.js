
module.exports = function(option)  {
    if (!option) {
        option =  {
            createSampleData: false
        };
    }
    var models = require('./schema/models')();
    
    if (option.createSampleData) {
        require('./schema/createData')(models);
    }
    
    var express = require('express');
    var http = require('http');
    var app = express();
    
    var logging = require('./logging');
    app.use(logging);
    
    app.use('/api/translation', require('./api/translation')(models));    
    app.use('/api/translate', require('./api/translate')(models));    

    app.get('/', function(req, res) {
        res.send("epl-translate Service");
    });
    
    return app;  
    
};

