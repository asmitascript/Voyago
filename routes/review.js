const express = require("express");
const router = express.Router({mergeParams: true});
const flash = require("connect-flash");
const Listing = require("../models/listings.js");
const Review = require("../models/review.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {reviewSchema} = require("../schema.js");
const { isLoggedIn, isAdmin, isReviewAuthor, isReviewAuthorOrAdmin } = require("../middleware.js");

const reviewController = require("../controllers/reviews.js");

//Middleware
const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);

    if (error) {
        const errmsg = error.details.map(el => el.message).join(", ");
        throw new ExpressError(errmsg, 400);
    } else {
        next();
    }
};

//Post Review Route
router.post("/", 
    isLoggedIn,
    validateReview, 
    wrapAsync(reviewController.postReview));


//Delete Deview Route
router.delete("/:reviewId", 
    isLoggedIn,
    isReviewAuthorOrAdmin,
    wrapAsync(reviewController.deleteReview)
);


module.exports = router;