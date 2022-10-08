const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const userModel = mongoose.model("User");

const userDocument = require("../models/userSchema");

router.get("/", (req, res) => {

      res.render("index", {});
});
router.get("/loginpage", (req, res) => {

      res.render("loginpage", {});
});
router.get("/registerpage", (req, res) => {

      res.render("registerpage", {});
});
router.post("/login", (req, res) => {
  var gotUsername = req.body.username;
  var gotPass = req.body.password;

  userModel.findOne({ username: gotUsername }, (err, docs) => {
    if (!err) {
      if (docs) {
        // check is password is correct, if not show error and send to error page

        if(gotPass == docs.password){
          res.render("profile",{data : docs});

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
          res.render("profile",{data : docs});
          
      }
    } else {
      console.log("Got an error");
    }
  });
});

module.exports = router;