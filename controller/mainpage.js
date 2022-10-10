const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const userModel = mongoose.model("User");
const questModel = mongoose.model("Questions");
const userDocument = require("../models/userSchema");
const questDocuments = require("../models/questSchema");
var globalUser;
var globalTeamID;
var counter = 1;
router.get("/", (req, res) => {

      res.render("index", {});
});
router.get("/loginpage", (req, res) => {

      res.render("loginpage", {});
});
router.get("/registerpage", (req, res) => {

      res.render("registerpage", {});
});

router.get("/quiz", (req, res) => {
questModel.findOne({ qid:counter }, (err, docs) => {
    if (!err) {
      if (docs) {

      res.render("quiz", {'username' : globalUser, 'TeamID': globalTeamID, 'i': counter, 'question': docs.question})
    }
    }
});
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

  questModel.findOne({ qid: counter }, (err, docs) => {
    if (!err) {
      if (docs) {
        // check is password is correct, if not show error and send to error page

        if(gotanswer == docs.answer){
          counter++;
          if (counter == 12)
            res.render("leaderboard",{});
          questModel.findOne({ qid:counter }, (err, docs) => {
    if (!err) {
      if (docs) {

      res.render("quiz", {'username' : globalUser, 'TeamID': globalTeamID, 'i': counter, 'question': docs.question})
    }
    }
});

        }
        else{
        res.render("quiz", {'username' : globalUser, 'TeamID': globalTeamID, 'i': counter, 'question': docs.question});

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
          res.render("profile",{'username' : docs.username, 'password': docs.password, 'TeamID': docs.TeamID });
          
      }
    } else {
      console.log("Got an error");
    }
  });
});

module.exports = router;