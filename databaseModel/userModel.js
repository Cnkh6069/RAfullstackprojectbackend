const mongoose = require("mongoose");

//creating a model scheme to structure how the collection called User will look like in the database

const userSchema = new mongoose.Schema({
  userName: String,
  password: String,
  firstName: String,
  lastName: String,
  email: String,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
