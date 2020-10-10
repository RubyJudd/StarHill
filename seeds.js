const mongoose = require("mongoose");
const Campground = require("./models/campground");
const Comment = require("./models/comment");

const data = [
	{
		name: "Clouds Rest",
		image:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQQCPOhFYQWCvvCbhbZ42waytKeDTCKzYP9xA&usqp=CAU",
		description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
	},
	{
		name: "No Name",
		image:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRJJrwmWF1tDVSb6xQnixwXZvVLdE5cSpWhZw&usqp=CAU",
		description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborumaidhf asodihgao hgoaisdhg aosihd gahsoihg shdgoihas odig"
	},
	{
		name: "Sky High",
		image:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTqpSJXv0ZzGD6bqe5kIN-Kn5d_ynvMuM2Vbg&usqp=CAU",
		description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum aidhf asodihgao hgoaisdhg aosihd gahsoihg shdgoihas odig"
	}
]

function seedDB(){
	
// This mongoose method will wipe clear your database 
	
				Campground.remove({}, function(err){
				if(err){
					console.log(err);
				  }
				});
				// console.log("removed campgrounds");
//                 Comment.remove({}, function(err) {
//                    if(err){
//                    console.log(err);
//                    }
//                   console.log("removed comments");
		
// // Add a few new campgrounds: loop through array of data and create a  campground for each  one. as you called the variable in the fucntion seed it represents one campground 
// // 	run the create method on that campground 
		
// 	              data.forEach(function(seed){
		
// 			       Campground.create(seed, function(err, campground){
// 				   if(err){
// 					   console.log(err)
// 				   } else {
// 					   console.log("added a campground");
					   
// //create a comment
					   
// 				Comment.create (
// 					{
// 						text: "This place is great, but I wish there was internet",
// 						author: "Homer"
// 					}, function(err, comment){
// 						if(err){
// 							console.log(err);
// 						} else {
// // Associate this comment with the campground the was just created - called campground in your above function
							
// 						campground.comments.push(comment);
// 						campground.save();
// 						console.log("Created new comment");
// 				         }
//                       });
//                     }
//                 });
//             });
//         });
    
}			   
			

module.exports = seedDB;
