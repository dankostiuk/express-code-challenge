const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const User = require("../models/user");
const Institution = require("../models/institution");

/**
 * The users route handler.
 */
router.post("/create", async (req, res, next) => {
  const { name, email, role, password } = req.body;
  let errors = [];

  // check required fields
  if (!name || !email || !role || !password) {
    errors.push({
      msg: "Please fill in all fields"
    });
  }

  if (!email.includes("@")) {
    errors.push({
      msg: "Must be a valid email."
    });
  } else {
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
      errors.push({
        msg: "The user's email must belong to a valid institution."
      });
    }
  }

  if (role !== "student" && role !== "academic" && role !== "administrator") {
    errors.push({
      msg: "Role must be one of: student, academic, or administrator."
    });
  }

  if (errors.length > 0) {
    res.status(400).send({ errors: [errors] });
  } else {
    let id = mongoose.Types.ObjectId();
    const newUser = new User({
      _id: id,
      email: email,
      password: password,
      name: name,
      role: role
    });

    bcrypt.genSalt(10, (err, salt) =>
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) {
          throw err;
        }
        // set password to hashed
        newUser.password = hash;
        // save user
        newUser
          .save()
          .then(user => {
            passport.authenticate("local", {
              successRedirect: "/",
              failureRedirect: "/"
            })(req, res, next);
          })
          .catch(err => console.log(err));
      })
    );
  }
});

router.post("/signin", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/"
  })(req, res, next);
});

router.get("/logout", (req, res) => {
  req.logout();
  res.status(200).send();
});

module.exports = router;
