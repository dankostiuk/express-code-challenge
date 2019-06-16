let mongoose = require("mongoose");
require("dotenv").config();

let connection = mongoose.createConnection(process.env.DB_CONN, {
  useNewUrlParser: true
});

initializeData = async () => {
  console.log("Initializing mongodb default data...");
  let institutionSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    url: String,
    emailDomain: String
  });
  let Institution = connection.model("Institution", institutionSchema);

  // delete previous collections data

  connection
    .dropCollection("institutions")
    .then(function() {
      // success do nothing
    })
    .catch(function() {
      // error handling
      console.log("Collection doesn't exist, continue...");
    });

  connection
    .dropCollection("books")
    .then(function() {
      // success do nothing
    })
    .catch(function() {
      // error handling
      console.log("Collection doesn't exist, continue...");
    });

  let bookSchema = new mongoose.Schema({
    isbn: String,
    title: String,
    author: String,
    institution_id: mongoose.Schema.Types.ObjectId
  });
  let Book = connection.model("Book", bookSchema);

  let inst1Id = mongoose.Types.ObjectId();
  let inst1 = new Institution({
    _id: inst1Id,
    name: "McGill University",
    url: "mcgill.ca",
    emailDomain: "mcgill"
  });

  let inst2Id = mongoose.Types.ObjectId();
  let inst2 = new Institution({
    _id: inst2Id,
    name: "University of Toronto",
    url: "utoronto.ca",
    emailDomain: "utoronto"
  });

  let inst3Id = mongoose.Types.ObjectId();
  let inst3 = new Institution({
    _id: inst3Id,
    name: "Queens University",
    url: "queens.ca",
    emailDomain: "queens"
  });

  console.log("Adding new stock institutions and books data...");

  await inst1.save(async (err, institution) => {
    if (err) {
      return console.error(err);
    }

    let book1 = new Book({
      title: "Science",
      author: "McGraw Hill",
      isbn: "1234asdf",
      institution_id: inst1Id
    });

    let book2 = new Book({
      title: "Law",
      author: "McGraw Hill",
      isbn: "sdgdsk3423",
      institution_id: inst1Id
    });

    let book3 = new Book({
      title: "Biology",
      author: "McGraw Hill",
      isbn: "23jkfsd2",
      institution_id: inst1Id
    });

    await book1.save((err, book) => {
      if (err) {
        return console.error(err);
      }
    });

    await book2.save((err, book) => {
      if (err) {
        return console.error(err);
      }
    });

    await book3.save((err, book) => {
      if (err) {
        return console.error(err);
      }
    });
  });

  await inst2.save(async (err, institution) => {
    if (err) {
      return console.error(err);
    }

    let book4 = new Book({
      title: "Math",
      author: "McGraw Hill",
      isbn: "afsdt232",
      institution_id: inst2Id
    });

    await book4.save((err, book) => {
      if (err) {
        return console.error(err);
      }
    });
  });

  await inst3.save(async (err, institution) => {
    if (err) {
      return console.error(err);
    }

    let book5 = new Book({
      title: "History",
      author: "McGraw Hill",
      isbn: "sdgjksd234",
      institution_id: inst3Id
    });

    await book5.save((err, book) => {
      if (err) {
        return console.error(err);
      }

      console.log("Finished initializing mongodb default data.");
      process.exit();
    });
  });
};

initializeData();
