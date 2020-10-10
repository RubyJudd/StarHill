const express = require("express");
const router = express.Router();
const Campground = require("../models/campground");
const middleware = require("../middleware/index.js");


// INDEX = show all campgrounds
router.get("/", function(req, res){	
	Campground.find({},function(err, allCampgrounds){
	 if(err){
		 Console.log(err);
	 } else {
// take all the campgrounds that just came back from DB and send them to the ejs file 
		res.render("campgrounds/index", {campgrounds: allCampgrounds});
	 }
  });
});

// CREATE = add new campgrounds to data base 
router.post("/", middleware.isLoggedIn, function(req, res){
//  get data from form
	const name = req.body.name;
	const price = req.body.price;
	const image = req.body.image;
	const desc = req.body.description;
	const author = {
		id: req.user._id,
		username: req.user.username
	}
	const newCampground = {name: name, image: image, description: desc, author:author, price: price}
// 	create a new campground and save to database 
	Campground.create(newCampground, function(err, newlyCreated){
		if(err){
			console.log(err);
		} else {
// 	redirect back to page with all the campgrounds 
	        res.redirect("/campgrounds");
		}
	});
});

// NEW = show form to create a new campground 
router.get("/new", middleware.isLoggedIn, function(req, res){
	res.render("campgrounds/new");
});

// SHOW - shows more info about one campground
router.get("/:id", function(req, res){
//find the campground with provided ID. Populate the comments on that campground 
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
			console.log(foundCampground);
//render the template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
})

//  EDIT 
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        res.render("campgrounds/edit", {campground: foundCampground});
    });
});



// UPDATE 
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
   // find and update the correct campgrounds
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
		if(err){
			res.redirect("/campgrounds");
		} else {
			res.redirect("/campgrounds/" + req.params.id);
		}
	});	
});


// DESTROY
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
   Campground.findByIdAndRemove(req.params.id, function(err){
	   if(err){
		   res.redirect("/campgrounds");
	   } else {
		   res.redirect("/campgrounds");
	   }
   })
});






module.exports = router;
