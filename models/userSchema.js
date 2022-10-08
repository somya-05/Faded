// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
// define the schema for our user model
var userSchema = mongoose.Schema({

   username:{
    type : String,
    required : "Required"
   },
   password:{
    type : String,
    required : "Required"
   },
   TeamID:{
    type : Number,
    required : "Required"
   }


});



// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema,"users");
