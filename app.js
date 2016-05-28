
var server = require('./server');
var http = require('http');
var app = server();

var port = process.env.PORT || 3000;
http.createServer(app).listen(3000, function() {
	console.log("Server listen on port:", port);
})