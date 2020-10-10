const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
	username: String,
	password: String
});

// plugin which gives methods to our user model 
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);