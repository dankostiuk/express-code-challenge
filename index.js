const express = require("express");
const app = express();
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const jsend = require("jsend");

const index = require("./routes/index.js");
const users = require("./routes/users");
const books = require("./routes/books");
require("dotenv").config();

app.use(express.json());
app.use(jsend.middleware);

// passport config
require("./config/passport")(passport);

// express session
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false
  })
);

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// routes
app.get("/", index);
app.use("/users", users);
app.use("/books", books);

// connect to Mongo when the app initializes
mongoose
  .connect(process.env.DB_CONN, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => console.log("MongoDB Connected..."))
  .catch(err => console.log);

app.listen(3000, () =>
  console.log(`Open http://localhost:3000 to see a response.`)
);

module.exports = app;
