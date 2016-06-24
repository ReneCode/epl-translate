
var app = require('./server');
//var http = require('http');

var node_env = process.env.NODE_ENV || 'development';

var option = {
	createSampleData: false,
	logging: true,
	node_env: node_env,
	testing: false
};

/*
var port = process.env.PORT || 3000;
http.createServer(app).listen(3000, function() {
	console.log("Server listen on port:", port);
})

*/


var port = process.env.PORT || 3000;
app(option).listen(3000, function() {
	console.log("Server listen on port:", port);
});



