const express = require("express");
const User = require("../models/User.model");
const passport = require("passport");
const _ = require("lodash");
const router = express.Router();
const { hashPassword, checkHashed } = require("../lib/hashing");
const { isLoggedIn, isLoggedOut } = require("../lib/isLoggedMiddleware");

router.post("/signup", isLoggedOut(), async (req, res, next) => {
  const { username, password, campus, course, image } = req.body;

  // Create the user
  const existingUser = await User.findOne({ username });
  try {
    if (!existingUser) {
      const newUser = await User.create({
        username,
        password: hashPassword(password),
        campus,
        course,
        image
      });
      // Directly login user
      req.logIn(newUser, err => {
        res.json(
          _.pick(req.user, [
            "username",
            "password",
            "campus",
            "course",
            "image",
            "_id",
            "createdAt",
            "updatedAt"
          ])
        );
      });
    } else {
      res.json({ status: "User Exist" });
    }
  } catch (e) {
    console.log(e);
  }
});

// LOGIN
router.post(
  "/login",
  isLoggedOut(),
  passport.authenticate("local"),
  (req, res) => {
    // Return the logged in user
    return res.json(
      _.pick(req.user, [
        "username",
        "password",
        "campus",
        "course",
        "image",
        "_id",
        "createdAt",
        "updatedAt"
      ])
    );
  }
);

// LOGOUT
router.post("/logout", isLoggedIn(), async (req, res, next) => {
  if (req.user) {
    req.logout();
    return res.json({ status: "Log out" });
  } else {
    return res
      .status(401)
      .json({ status: "You have to be logged in to logout" });
  }
});

/* EDIT */
router.post("/edit", isLoggedIn(), async (req, res, next) => {
  try {
    const id = req.user._id;
    const { username, campus, course } = req.body;
    await Users.findByIdAndUpdate(id, {
      username,
      campus,
      course
    });
    return res.json({ status: "Edit Profile" });
  } catch (error) {
    return res.status(401).json({ status: "Not Found" });
  }
});

// WHOAMI
router.get("/whoami", (req, res, next) => {
  if (req.user) return res.json(req.user);
  else return res.status(401).json({ status: "No user session present" });
});

module.exports = router;
