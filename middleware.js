const Listing = require('./models/listings');
const Review = require('./models/review');

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        // Store the original URL in session
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be signed in first!");
        return res.redirect("/login");
    }
    next();
};


module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

module.exports.redirectIfLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.redirect("/listings");
    }
    next(); // not logged in, continue
};


module.exports.isOwner = async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id); // singular
    if (!listing) {
        req.flash("error", "Listing not found");
        return res.redirect("/listings");
    }
    if (!listing.owner.equals(res.locals.currUser._id)) {
        req.flash("error", "Sorry, you can't delete this listing");
        return res.redirect(`/listings/${id}`);
    }
    next();
};

module.exports.isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;

    try {
        const review = await Review.findById(reviewId);
        if (!review) {
            req.flash("error", "Review not found");
            return res.redirect(`/listings/${id}`);
        }

        if (!review.author.equals(res.locals.currUser._id)) {
            req.flash("error", "You don't have permission to do that");
            return res.redirect(`/listings/${id}`);
        }

        next();
    } catch (err) {
        console.error(err);
        req.flash("error", "Something went wrong");
        res.redirect(`/listings/${id}`);
    }
};

module.exports.isAdmin = (req, res, next) =>{
    if (!req.isAuthenticated()) {
        req.flash("error", "You must be logged in first!");
        return res.redirect("/login");
    }
    if(req.user.role !== 'admin') {
        req.flash("error", "Access denied!, Admins only.");
        return res.redirect("/login");
    }
    next();
};


module.exports.isOwnerOrAdmin = async (req, res, next) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);

    if (!listing) {
        req.flash("error", "Listing not found");
        return res.redirect("/listings");
    }

    if (listing.owner.equals(req.user._id)) {
        // User is the owner
        return next();
    } else if (req.user.role === "admin") {
        // User is admin
        return next();
    } else {
        // Neither owner nor admin
        req.flash("error", "You do not have permission to do that");
        return res.redirect(`/listings/${id}`);
    }
};

module.exports.isReviewAuthorOrAdmin = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review) {
        req.flash("error", "Review not found");
        return res.redirect(`/listings/${id}`);
    }

    if (review.author.equals(req.user._id) || req.user.role === "admin") {
        return next();
    }

    req.flash("error", "You don't have permission to delete this review");
    return res.redirect(`/listings/${id}`);
};