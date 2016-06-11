
module.exports = function(option)  {
    if (!option) {
        option =  {
            createSampleData: false,
            logging: true,
            production: false
        };
    }
    
    var serveStatic = require('serve-static');
    var path = require('path');
    var routes = require('./routes/routes');
 
    var models = require('./schema/models')(option);
    
    if (option.createSampleData) {
        require('./schema/createData')(models);
    }
    
    var express = require('express');
    var app = express();

    if (option.logging) {
        var logging = require('./logging');
        app.use(logging);
    }
  
    app.use(serveStatic(path.join(__dirname, 'public')));

    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'pug'); 
    
    routes(app, models);

    var http = require('http');
    var port = process.env.PORT || 3000;
    var server = http.createServer(app);

    var mongoose = require('mongoose');
    
    server.on('close', function() {
        // remove the registrated models, because otherwise on testing
        // multiple files, the second file will cause an error
        // on registration a model and it is allready registed
        mongoose.models = [];
        mongoose.connection.close();
    });
   
    return server;  
};

