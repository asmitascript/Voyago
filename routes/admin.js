const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const Listing = require("../models/listings");
const Review = require("../models/review");
const wrapAsync = require("../utils/wrapAsync.js");
const {isAdmin, isLoggedIn } = require("../middleware.js");

const adminController = require("../controllers/admin.js");

// Dashboard route
router.get("/", 
    isLoggedIn, 
    isAdmin, 
    adminController.dashboard
    );


//allUser
router.get("/user", adminController.allUser);

//allReviews
router.get("/allreviews", adminController.allReview);

//deleteUser
router.delete("/users/:userId", isLoggedIn, isAdmin, wrapAsync(adminController.deleteUser));


module.exports = router;
