var express = require('express');
var routes = express.Router();

routes.get("/", function(req, res){
	var io = req.app.get('socket.io');
	io.on('connection', function(socket){
		console.log("connected");
		io.emit("loggedIn", global.userInfo);
	});
	res.render('user');
});



module.exports = routes;


