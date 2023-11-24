const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  Name: {
    type: String,
    require: true,
  },
  Email: {
    type: String,
    require: true,
    unique: true,
  },
  Password: {
    type: String,
    require: true,
  },
  
});

const User = mongoose.model("User", userSchema);

module.exports = User;
