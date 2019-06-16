let mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
  name: String,
  email: String,
  role: String,
  password: String,
  institution_id: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model("User", userSchema);
