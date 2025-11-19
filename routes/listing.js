const express = require("express");
const router = express.Router();
const Listing = require("../models/listings.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {listingSchema} = require("../schema.js");
const { isLoggedIn, isOwner, isAdmin, isOwnerOrAdmin } = require("../middleware.js");

const listingController = require("../controllers/listings.js");

const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

//Middleware
const validateListing = (req, res, next) => {
    const { error } = listingSchema.validate(req.body);

    if (error) {
        const errmsg = error.details.map(el => el.message).join(", ");
        req.flash('error', errmsg);
        throw new ExpressError(errmsg, 400); 
    } else {
        next();
    }
};



//Index route
//Create Route
router
    .route("/")
    .get(wrapAsync(listingController.index))
    .post(
        isLoggedIn,
        upload.single("listing[image]"),
        validateListing,
        wrapAsync(listingController.create)
    );

//listings/my
router.get("/user", isLoggedIn, listingController.myListings);

//New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);


//Edit route
router.get(
    "/:id/edit", 
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.edit)
);


//Show route
//Update route
//Delete Route
router.route("/:id")
.get( 
    wrapAsync(listingController.showListing))
.put(
    isLoggedIn,
    isOwner,
    validateListing,
    upload.single("listing[image]"),
    wrapAsync(listingController.update)
)
.delete( 
    isLoggedIn, 
    isOwnerOrAdmin,
    wrapAsync(listingController.delete)
);



module.exports = router;