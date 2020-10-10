const express = require("express");
const router = express.Router({mergeParams: true});
const Campground = require("../models/campground");
const Comment = require("../models/comment");
const middleware = require("../middleware/index.js");

// we are inside the route directory and need to go back and then inside the models directory hence the .. 

// ================================================
// COMMENTS
// Nested Routes. Comments are linked campgrounds 



// NEW ROUTE FOR COMMENTS 

router.get("/new", middleware.isLoggedIn, function(req, res){
// 	find campground by ID
	
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
		} else{
// pass in the value of the campground coming back from database 
// make your function variable campground equal to a variable called campground in ejs file 
				res.render("comments/new", {campground: campground});
		}
	});
});

// CREATE ROUTE FOR COMMENTS 

router.post("/", middleware.isLoggedIn, function(req, res){
   Campground.findById(req.params.id, function(err, campground){
       if(err){
           console.log(err);
           res.redirect("/campgrounds");
       } else {
        Comment.create(req.body.comment, function(err, comment){
           if(err){
               console.log(err);
           } else {
			   
			   comment.author.id = req.user._id;
			   comment.author.username = req.user.username;
			   comment.save();
               campground.comments.push(comment);
               campground.save();
			   req.flash("success", "Comment Added");
               res.redirect('/campgrounds/' + campground._id);
           }
        });
       }
   });
});

//lookup campground using ID
// create a new comment in the database from the form 
// comment is the name you gave to the info on your comment form 
// Add user name and id to the comment and save the comment. 
 // associate the comment to the campground. push it into the array. campground is your above function variable refering to the campground id you requested from the url 


// COMMENT EDIT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
   Comment.findById(req.params.comment_id, function(err, foundComment){
      if(err){
          res.redirect("back");
      } else {
        res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
      }
   });
});


// // COMMENT UPDATE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
   Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
      if(err){
          res.redirect("back");
      } else {
          res.redirect("/campgrounds/" + req.params.id );
      }
   });
});


// // COMMENT DESTROY ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
       if(err){
           res.redirect("back");
       } else {
           req.flash("success", "Comment Deleted");
           res.redirect("/campgrounds/" + req.params.id);
       }
    });
});

// req.params.id is the campground id and NOT the comment id as campground id is the first id in our route



// function checkCommentOwnership(req, res, next){
//  if(req.isAuthenticated()){
//         Comment.findById(req.params.comment_id, function(err, foundComment){
//            if(err){
//                res.redirect("back");
//            }  else {
//                // does user own the comment?
//             if(foundComment.author.id.equals(req.user._id)) {
//                 next();
//             } else {
//                 res.redirect("back");
//             }
//            }
//         });
//     } else {
//         res.redirect("back");
//     }
// }


// function isLoggedIn(req, res, next){
// 	if(req.isAuthenticated()){
// 		return next();
// 	}
// 	res.redirect("/login");
// }

module.exports = router;
