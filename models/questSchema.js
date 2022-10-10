// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
// define the schema for our user model
var questSchema = mongoose.Schema({

qid:{
    type : Number,
    required : "Required"
   },
   question:{
    type : String,
    required : "Required"
   },
   answer:{
    type : String,
    required : "Required"
   }

});



// create the model for users and expose it to our app
module.exports = mongoose.model('Questions', questSchema,"questions");