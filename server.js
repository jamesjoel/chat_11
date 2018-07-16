var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
// app.set("io", io);
// req.app.get("io")
app.set('view engine', 'ejs');
app.use(bodyParser());
app.use(cookieParser());
app.use(session({ secret : "TSS"}));

var newObj={};

var nameArr = [];
var newArr=[];
var name = "";

app.get('/', function(req, res){
	res.render('get_name');
});
app.post("/", function(req, res){

	nameArr.push(req.body.name);
	req.session.name=req.body.name;
	newObj[req.session.name]="";
	res.redirect("/chat");
});

app.get("/chat", function(req, res){
	var pageData = { names : nameArr, currentUser : req.session.name};
	res.render("chat", pageData);
});

io.on('connection', function(socket){
	console.log(socket.id);

	socket.on('conn', function(name){
		// var obj = { name : name, id : socket.id};
		// newArr.push(obj);
		console.log(name);
	});




	
	

	console.log(newArr);
	
});


/*
socket.on('send', function(data){
			io.sockets.socket(socket.id).emit("receive", data);
		});

*/






server.listen(3000);


