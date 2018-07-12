var express = require('express');
var app = express();
var server = require('http').Server(app);

var io = require('socket.io')(server);


app.get("/", function(req, res){
	res.sendFile(__dirname+"/index.html");
});
io.on("connection", function(socket){
	socket.on("msg", function(data){
		console.log(data);
		// io.emit("sms", data);
		socket.broadcast.emit('sms', data)
		socket.broadcast.emit('type', "");
	});



	socket.on('type', function(data){
		// var type_msg = data+" is Typing...";
		socket.broadcast.emit('type', data+" is Typing...");
	});
});



server.listen(3000, function(){
	console.log("Server Running");
});