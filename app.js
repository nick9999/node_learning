var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');



var app = express();

var http = require('http').Server(app)
var io = require('socket.io')(http)

// //Setup route for request 
// app.get('/', function(req, res){
// 	res.send("Hello Node!!")
// });




// use of static file in node app 
app.use(express.static(__dirname));

//setup body parser for incoming requests 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



// connect to mongo db with url 
var dbUrl = 'mongodb://nikhilp:chatdb1@ds223015.mlab.com:23015/chatdb1';


// define schema for the database
var msg = mongoose.model("Message", {
	name: String,
	message: String
})

// setup get call 
app.get('/messages', (req, res) => {
	msg.find({}, (err, messages) => {
		console.log("all records are fretched properly")
		res.send(messages);
	})
})

// setup post call 
app.post('/messages', async (req, res) => {
	try {
		var message = new msg(req.body);

		var savedMessage = await message.save()
		console.log('saved1');
		io.emit('message', req.body);
		res.sendStatus(200);
	}
	catch (error) {
		res.sendStatus(500);
		return console.log('error', error);
	}
	finally {
		console.log('Message Posted')
	}

})

//create a connection for socket io
io.on('connection', () => {
	console.log("A user is connected");
})

mongoose.connect(dbUrl, (err) => {
	console.log("Connection established with mongo db", err);
});

// start the node app on specified port 
var server = http.listen(3000, () => {
	console.log("server is running on 3000");
})