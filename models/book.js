let mongoose = require("mongoose");

let bookSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  isbn: String,
  title: String,
  author: String,
  institution_id: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model("Book", bookSchema);
