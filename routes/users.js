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

  let institutionId = 0;
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
    } else {
      institutionId = institution._id;
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
      role: role,
      institution_id: institutionId
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
  passport.authenticate("local", function(err, user, info) {
    if (err) {
      res.jsend.error({
        code: 500,
        message: "Something went wrong while trying to log in"
      });
    } else {
      if (!user) {
        res.jsend.error({
          code: 403,
          message: "Invalid login"
        });
      } else {
        req.login(user, function(err) {
          if (err) {
            res.jsend.error({
              code: 500,
              message: "Something went wrong while trying to log in"
            });
          } else {
            res.jsend.success("Valid login");
          }
        });
      }
    }
  })(req, res);
});

router.get("/logout", (req, res) => {
  req.logout();
  res.status(200).send();
});

module.exports = router;
