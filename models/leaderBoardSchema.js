var mongoose = require('mongoose');
// define the schema for our user model
var leaderBoardSchema = mongoose.Schema({

   TeamID:{
    type : Number,
    required : "Required"
   },
   Score:{
    type : Number,
    required : "Required"
   },
   counter:{
    type: Number,
    required : "Required"
   }
});



// create the model for users and expose it to our app
module.exports = mongoose.model('Scoreboard', leaderBoardSchema,"scoreboard");