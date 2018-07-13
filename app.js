var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var flash = require('express-flash');
var cache = require('nocache');
var server = require('http').Server(app);
var io = require('socket.io')(server);


app.set('view engine', 'ejs');


app.set('socket.io', io);
//  req.app.get('socket.io')


app.use(bodyParser());
app.use(cookieParser());
app.use(session({ secret : "TSS"}));
app.use(flash());
app.use(cache());

app.use(function(req, res, next){
	// console.log(req.session);
	if(! global.userInfo){
		global.userInfo=[];
	}
	res.locals.session = req.session;
	next();
});


app.use(require('./config/routes'));

var port = process.env.PORT || 3000;
server.listen(port, function(){
	console.log("Server Running");
});


