const { request } = require("express");
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
router.get("/teampage", (req, res) => {

  res.render("teampage", {});
});
router.get("/teampage", (req, res) => {

  res.render("teampage", {});
});
router.get("/rulebook", (req, res) => {

  res.render("rulebook", {});
});
router.post("/login", (req, res) => {
  var gotEmailid = req.body.emailid;
  var gotPass = req.body.password;
  console.log("req.body: ", req.body)
  userModel.findOne({ emailid: gotEmailid }, (err, docs) => {
    console.log("err ", err);
    if (!err) {
      if (docs) {
        // check is password is correct, if not show error and send to error page
        console.log("docs: ",docs);
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
  var gotEmailid = req.body.username;
  var gotPass = req.body.password;
  var gotRePass= req.body.re_password;
  if(gotPass==gotRePass){
  userModel.findOne({ username: gotEmailid }, (err, docs) => {
    if (!err) {
      if (docs) {
        // username already exists
        res.render("error", {});
      } else {
        const newUser = new userDocument({
            username: gotEmailid,
            password: gotPass,
            fullname: req.body.fullname,
            registration: req.body.regno,
            emailid: req.body.emailid,
            semester: req.body.semester,
            collegename: req.body.colleges
          });
          newUser.save();
          res.render("profile",{data : docs});
          
      }
    } else {
      console.log("Got an error");
    }
  });
}
else{
  res.render("registerpage",{error:"passwords don't match"});
}
});

module.exports = router;