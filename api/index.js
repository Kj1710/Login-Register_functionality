const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const app = express();
const port = 8000;
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
const jwt = require("jsonwebtoken");

mongoose
  // TODO: Change IP Address
  .connect("mongodb://127.0.0.1:27017/Login-Register-Fun", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected To Mongo DB");
  })
  .catch((err) => {
    console.log("Error Connecting To MongoDB", err);
  });

app.listen(port, "192.168.29.184", () => {
  console.log("Server Is Running On Port 8000");
});

const User = require("./models/User");

//Endpoint For Registration Of the User

app.post("/register", (req, res) => {
  const { Name, Email, Password } = req.body;

  // Create New User
  const NewUser = new User({ Name, Email, Password });

  // Save The User To The DataBase
  NewUser.save()
    .then(() => {
      res
        .status(200)
        .json({ success: true, message: "User Registered Successfully" });
    })
    .catch((err) => {
      if (err.code === 11000) {
        // Duplicate key error (E11000)
        res
          .status(400)
          .json({ success: false, message: "Email is already registered" });
      } else {
        console.log("Error registering ", err);
        res.status(500).json({
          success: false,
          message: "Error Registering",
          error: err.message,
        });
      }
    });
});

//TODO: LEARN HOW IT WORKS ::::Function Of Token
const createToken = (Userid) => {
  const payload = {
    Userid: User.id,
  };

  const Token = jwt.sign(payload, "QAZMLP", { expiresIn: "10h" });
  return Token;
};

//EndPoint For Logging The User
app.post("/login", (req, res) => {
  const { Email, Password } = req.body;

  console.log("Received login request:", Email, Password);

  //Check If the Email And Password are Provided
  if (!Email || !Password) {
    return res.status(404).json({ message: "Email And Password are required" });
  }
  

});
