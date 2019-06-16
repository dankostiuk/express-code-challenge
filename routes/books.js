const express = require("express");
const router = express.Router();
let { ensureAuthenticated } = require("../config/auth");
const Book = require("../models/book");
const User = require("../models/user");
const Institution = require("../models/institution");

/**
 * The books route handler.
 */
router.get("/", ensureAuthenticated, async (req, res) => {
  let user = await User.findOne({ _id: req.session.passport.user })
    .then(user => {
      return user;
    })
    .catch(error => {
      console.log(error);
    });

  let email = user.email;

  let emailDomain = email.split("@")[1].split(".")[0];

  let institution = await Institution.findOne({
    emailDomain: emailDomain
  })
    .then(institution => {
      return institution;
    })
    .catch(error => {
      console.log(error);
    });

  if (!institution) {
    res
      .status(404)
      .send("This user does not belong to any valid institutions.");
  }

  const books = await Book.find({
    institution_id: institution.id
  });

  res.status(200).send(books);
});

module.exports = router;
