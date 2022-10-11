const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const userModel = mongoose.model("User");
const questModel = mongoose.model("Questions");
const userDocument = require("../models/userSchema");
const questDocuments = require("../models/questSchema");

const scoreModel = mongoose.model("Scoreboard");
const scoreDocument = require("../models/leaderBoardSchema");

var globalUser;
var globalTeamID;
var globalCounter;
router.get("/", (req, res) => {

      res.render("index", {});
});
router.get("/loginpage", (req, res) => {

      res.render("loginpage", {});
});
router.get("/registerpage", (req, res) => {

      res.render("registerpage", {});
});

router.get("/leaderboard", (req, res) => {
      scoreModel.find((err,docs) => {
      res.render("leaderboard", {data: docs});
      }).sort({Score : -1});
});
router.get("/quiz", (req, res) => {
  if (globalUser){
questModel.findOne({ qid:1 }, (err, docs) => {
    if (!err) {
      if (docs) {

      res.render("quiz", {'username' : globalUser, 'TeamID': globalTeamID, 'i': 1, 'question': docs.question})
    }
    }
});
}
else
  res.render("error",{});
    });


router.post("/login", (req, res) => {
  var gotUsername = req.body.username;
  var gotPass = req.body.password;

  userModel.findOne({ username: gotUsername }, (err, docs) => {
    if (!err) {
      if (docs) {
        // check is password is correct, if not show error and send to error page

        if(gotPass == docs.password){
          globalUser = docs.username;
          globalTeamID = docs.TeamID;
          scoreModel.findOne({TeamID: globalTeamID}, (err,docs2) =>{
            if (!err){
              if (docs2)
                globalCounter = docs2.counter;
            }
          })
          res.render("profile",{'username' : docs.username, 'password': docs.password, 'TeamID': docs.TeamID });

        }
        else{
        res.render("error", {});

        }
      } else {
        // tell username doesnt exist
        res.render("error", {});

      }
    } else {
      console.log("Got an error");
    }
  });
});



router.post("/quiz", (req, res) => {
  var gotanswer = req.body.answer;
var counter_v = globalCounter;
//console.log(counter_v)
  questModel.findOne({ qid: counter_v }, (err, docs) => {
    if (!err) {
      if (docs) {
        // check is password is correct, if not show error and send to error page

        if(gotanswer == docs.answer){
          counter_v++;
          globalCounter++;
          if (counter_v > 12)
            res.render("finalpage",{});
          questModel.findOne({ qid:counter_v }, (err, docs) => {
    if (!err) {
      if (docs) {
      var filter = {TeamID: globalTeamID};
      var score = counter_v*0.5 + 6;
      var updatedScore = {
      $set: {
        Score : score,
        counter: counter_v
      },
    };
    const options = { upsert: true };
    scoreDocument.updateOne(filter, updatedScore, options);
      res.render("quiz", {'username' : globalUser, 'TeamID': globalTeamID, 'i': globalCounter, 'question': docs.question})
    }
    }
});

        }
        else{
        res.render("quiz", {'username' : globalUser, 'TeamID': globalTeamID, 'i': globalCounter, 'question': docs.question});

        }
      } else {
        // tell username doesnt exist
        res.render("error", {});

      }
    } else {
      console.log("Got an error");
    }
  });
});

router.post("/register", (req, res) => {
  var gotUsername = req.body.username;
  var gotPass = req.body.password;
  var gotTeamID = req.body.TeamID;
  userModel.findOne({ username: gotUsername }, (err, docs) => {
    if (!err) {
      if (docs) {
        // username already exists
        res.render("error", {});
      } else {
        const newUser = new userDocument({
            username: gotUsername,
            password: gotPass,
            TeamID: gotTeamID
          });
          newUser.save();
          const newScore = new scoreDocument({
            TeamID: gotTeamID,
            Score: 0,
            counter: 1
          });
          newScore.save();
          globalUser = gotUsername;
          globalTeamID = gotTeamID;
          globalCounter = newScore.counter;
          res.render("profile",{'username' : globalUser , 'password': gotPass, 'TeamID': gotTeamID });
          
      }
    } else {
      console.log("Got an error");
    }
  });
});

module.exports = router;