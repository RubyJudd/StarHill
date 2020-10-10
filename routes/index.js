const express = require("express");
const router = express.Router();

const passport = require("passport");
const User = require("../models/user");

// ROOT ROUTE
router.get("/", function(req, res){
	res.render("landing");
});



// ================================================
// AUTH ROUTES
// REGISTER

// Show register form
router.get("/register", function(req, res){
	res.render("register");
})

// Handle Sign up logic
router.post("/register", function(req, res){
// add new user to the database and send encoded password
	const newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if(err){
		   req.flash("error", err.message);
		   return res.render("register");
		}
// log user in
		    passport.authenticate("local")(req, res, function(){
			req.flash("success", "Welcome to Yelpcamp " + user.username);
			res.redirect("/campgrounds");
		});
	});
});

// LOGIN
// Show login form
router.get("/login", function(req, res){
	res.render("login");
});

// handling login logic
router.post("/login", passport.authenticate("local",        
	 {
	  successRedirect: "/campgrounds",
	  failureRedirect: "/login"						    
     }), function(req, res){
});

// LOGOUT 
router.get("/logout", function(req, res){
	req.logout();
	req.flash("success", "You have logged out");
	res.redirect("/campgrounds");
});



module.exports = router;


// Adding the routes to the express router not the express app itself 
