
module.exports = function()  {
    var models = require('./schema/models')();
    require('./schema/createData')(models);
    
    var express = require('express');
    var http = require('http');
    var app = express();
    
    var logging = require('./logging');
    app.use(logging);
    
    app.use('/api/translation', require('./translation')(models));    
    app.use('/api/translate', require('./translate')(models));    

    app.get('/', function(req, res) {
        res.send("epl-translate Service");
    });
    
    return app;  
    
};

