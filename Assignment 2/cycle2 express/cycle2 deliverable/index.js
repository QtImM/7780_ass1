/*
	index.js
	Entry point for the app.
	To start: node index.js

Note: port number cannot be 80, so use 3000

*/

var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/', function(req, res) {
//	res.send("Hello World!");
/* display comp7780_home.html file */
	res.sendFile(__dirname + "/comp7780_home.html");


app.get('/product', function(req, res) {
		res.sendFile(__dirname + "/comp7780_product.html");
	});

app.get('/cart', function(req, res) {
		res.send("Add Cart - need MySQL hans");
	});

app.get('/check_out', function(req, res) {
		res.send("Check Out - need MySQL");
	});


});


app.listen(3000, function() {
	console.log('index.js listening to http://127.0.0.1:3000/ or http://localhost:3000/');
});

console.log('End of Program.');
