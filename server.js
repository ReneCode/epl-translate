
module.exports = function(option)  {
    if (!option) {
        option =  {
            createSampleData: false
        };
    }
    
    var serveStatic = require('serve-static');
    var path = require('path');
    var routes = require('./routes/routes');
 
    var models = require('./schema/models')();
    
    if (option.createSampleData) {
        require('./schema/createData')(models);
    }
    
    var express = require('express');
//    var http = require('http');
    var app = express();

    var logging = require('./logging');
    app.use(logging);
  
    app.use(serveStatic(path.join(__dirname, 'public')));

    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'pug'); 
   
    
    routes(app, models);


/*
    app.get('/', function(req, res) {
        res.send("epl-translate Service");
    });
*/


    
    return app;  
    
};

