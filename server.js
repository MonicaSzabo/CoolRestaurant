// Dependencies
// =============================================================
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

// (DATA)
// =============================================================
var customers = [{
	customerName: "Test",
	phoneNumber: "5555555",
	customerEmail: "example@example.com",
	customerID: "Hello"
}];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get('/', function(req, res){
	res.sendFile(path.join(__dirname, 'index.html'));
})

app.get('/viewTables', function(req, res){
	res.sendFile(path.join(__dirname, 'viewTables.html'));
})

app.get('/reserveTable', function(req, res){
	res.sendFile(path.join(__dirname, 'reserveTable.html'));
})


app.get('/api/tables/', function(req, res){

	for (var i=0; i < customers.length; i++){
		res.json(customers[i]);

	}
})


// Create New Customers - takes in JSON input
app.post('/api/new', function(req, res) {
	if(customers.length < 5) {
		app.post('/api/tables/new', function(req, res){

			var newCustomer = req.body;

			console.log(newCustomer);

			customers.push(newCustomer);

			res.json(newCustomer);
		})
	} else {
		app.post('/api/waitlist/new', function(req, res){

			var newCustomer = req.body;

			console.log(newCustomer);

			customers.push(newCustomer);

			res.json(newCustomer);
		})
	}
})


// Starts the server to begin listening 
// =============================================================
app.listen(PORT, function(){
	console.log('App listening on PORT ' + PORT);
})