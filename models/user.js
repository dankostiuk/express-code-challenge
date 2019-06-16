let mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
  name: String,
  email: String,
  role: String,
  password: String
});

module.exports = mongoose.model("User", userSchema);
