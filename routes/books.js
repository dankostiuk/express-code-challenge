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
  let user = await User.findOne({ _id: req.session.passport.user });

  console.log(user);

  let institution = await Institution.findOne({
    _id: user.institution_id
  });

  console.log(institution);

  if (!institution) {
    res
      .status(404)
      .send("This user does not belong to any valid institutions.");
  } else {
    const books = await Book.find({
      institution_id: user.institution_id
    });

    res.status(200).send(books);
  }
});

module.exports = router;
