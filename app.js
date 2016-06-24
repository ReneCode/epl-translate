
var app = require('./server');
//var http = require('http');

var production = false;
if (process.env.NODE_ENV == 'production') {
	production = true;
}

var option = {
	createSampleData: false,
	logging: true,
	production: production,
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



