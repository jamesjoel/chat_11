var express = require('express');
var routes = express.Router();
var sha1 = require('sha1');
var user = require("../model/user");

routes.get("/", function(req, res){
	res.render('login', { msg : req.flash('msg')});
});

routes.post("/", function(req, res){
	var u = req.body.username;
	var p = sha1(req.body.password);
	// console.log(p);
	// console.log(sha1(11));
	user.findWhere({ username : u}, function(err, result){
		if(result.length>0)
		{
			if(result[0].password==p)
			{
				req.session.uid=result[0]._id;
				req.session.name=result[0].full_name;
				req.session.is_logged_in=true;
				global.userInfo.push(result[0].full_name);
				res.redirect("/user");
			}
			else
			{
				req.flash("msg", "Password Incorrect");
				res.redirect("/");		
			}
		}
		else
		{
			req.flash("msg", "Username and Password Incorrect");
			res.redirect("/");
		}
	});

});



module.exports = routes;


