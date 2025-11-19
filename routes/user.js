const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl, redirectIfLoggedIn } = require("../middleware.js");

const userController = require("../controllers/users.js");

//signUpPage
//post signUp
router.route("/signup")
.get(userController.signUp)
.post(wrapAsync(userController.postSignUp));

//logInPage
//post login
router.route("/login")
  .get(redirectIfLoggedIn, userController.login) // prevent logged-in users from seeing login page
  .post(
      redirectIfLoggedIn,  // prevent logged-in users from logging in again
      saveRedirectUrl,      // save intended URL
      passport.authenticate("local", {
          failureRedirect: "/login",
          failureFlash: true,
      }),
      userController.postLogIn
  );



router.get("/logout", userController.logOut);

module.exports = router;