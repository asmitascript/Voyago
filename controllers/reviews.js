const Listing = require("../models/listings.js");
const Review = require("../models/review.js");

//Post Review Route
module.exports.postReview = async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    newReview.listing = listing._id;
    listing.reviews.push(newReview._id);

    await newReview.save();
    await listing.save();

    req.flash("success", "Thank you for adding a new reviews!");
    res.redirect(`/listings/${listing._id}`);
};

//Delete Deview Route
module.exports.deleteReview = async(req, res, next) => {
    let {id, reviewId} = req.params;

    await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);

    req.flash("success", "Review Deleted Successfully!");
    res.redirect(`/listings/${id}`);
};