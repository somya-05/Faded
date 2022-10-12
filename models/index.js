const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/techtatva",{
	useNewUrlParser : true},
	(error) => {
		if(!error){
			console.log("Success");
		}
		else{
			console.log(error);
		}
	}
);

const UserSchema = require("./userSchema");
const questSchema = require("./questSchema");
const leaderBoardSchema = require("./leaderBoardSchema");