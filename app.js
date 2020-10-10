const express = require("express");
const app = express();
const request = require("request");
const bodyParser  = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const methodOverrid = require("method-override");
const flash       = require("connect-flash");


const User = require("./models/user");
const Campground = require("./models/campground");
const Comment = require("./models/comment");
const seedDB  = require("./seeds");

// Requiring Routes
const commentRoutes = require("./routes/comments");
const campgroundRoutes = require("./routes/campgrounds");
const indexRoutes = require("./routes/index");




mongoose.connect('mongodb://localhost:27017/yelp_camp_v2', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to DataBase'))
.catch(error => console.log(error.message));

app.use(bodyParser.urlencoded({extended : true})); // app.use should be used here
// app.use(bodyParser.json())

app.set("view engine",  "ejs");

app.use(express.static(__dirname + "/public"));
// the directory that the style script is running is 

app.use(methodOverrid("_method"));

app.use(flash());

// PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret: "Once again",
	resave: false, 
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Create middleware that will be used on every route and then go to the next() code 
// 
// this will check for the id of current user, it will be empty if no one is logged in 
// it pass the value of current user to every single route 
app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});









app.use(indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);

// this will append /campgrounds in front of all our campgroundRoutes. This groups routes into topics and allows you to write shorter route declarations

app.listen(3000, function(){
    console.log("Listening on PORT: 3000");
});  
