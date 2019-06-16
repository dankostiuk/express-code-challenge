let mongoose = require("mongoose");

let institutionSchema = new mongoose.Schema({
  name: String,
  url: String,
  emailDomain: String
});

module.exports = mongoose.model("Institution", institutionSchema);
