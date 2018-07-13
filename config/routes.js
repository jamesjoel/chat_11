var express = require('express');
var routes = express.Router();

routes.use("/", require('../controller/home'));
routes.use("/user", backdoor, require('../controller/user'));


module.exports = routes;


function backdoor(req, res, next){
	if(! req.session.is_logged_in){
		res.redirect("/");
		return;
	}
	next();
}

