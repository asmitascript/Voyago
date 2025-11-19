const Listing = require("../models/listings");
const GEOAPIFY_KEY = process.env.GEOAPIFY_KEY;

//Index
module.exports.index = async (req, res) => {
  try {
    const { q, category } = req.query;
    let searchQuery = {};

    //Category filter (from filter buttons)
    if (category && category.trim() !== "") {
      searchQuery.category = category.toLowerCase();
    }

    //Search filter (from navbar)
    if (q && q.trim() !== "") {
      const fullQuery = q.trim().toLowerCase();

      // Recognize multi-word categories FIRST
      const categoryKeywords = [
        "mountains", "cozy beach", "resorts", "hotels",
        "forest", "castle", "farms", "cities",
        "camping", "island"
      ];

      // Detect if the full query includes any category keyword (multi-word aware)
      const categoryMatch = categoryKeywords.find(cat =>
        fullQuery.includes(cat)
      );

      if (categoryMatch && !searchQuery.category) {
        searchQuery.category = categoryMatch.toLowerCase();
      }

      // Split into individual keywords (for text matching)
      const keywords = fullQuery.split(/\s+/);

      // Build the $or condition for text-based search
      searchQuery.$or = [];
      for (let kw of keywords) {
        const regex = new RegExp(kw, "i"); // case-insensitive
        searchQuery.$or.push(
          { title: { $regex: regex } },
          { location: { $regex: regex } },
          { country: { $regex: regex } },
          { description: { $regex: regex } }
        );
      }
    }

    const allListings = await Listing.find(searchQuery).populate("owner");

    res.render("listings/index.ejs", {
      allListings,
      selectedCategory: category || searchQuery.category || "",
      query: q || ""
    });
  } catch (err) {
    res.status(500).send("Server Error");
  }
};


//user listing Index
module.exports.myListings = async (req, res) => {
  try {
    // req.user._id comes from Passport (if using passport.js)
    const userId = req.user._id;

    // Find listings owned by the logged-in user
    const listings = await Listing.find({ owner: userId }).sort({ createdAt: -1 });

    res.render("listings/userlisting.ejs", { listings });
  } catch (err) {
    // console.error("Error loading user's listings:", err);
    res.status(500).send("Internal Server Error");
  }
};

//New Route
module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs"); 
};

//Show route
module.exports.showListing = async (req, res)=>{
   let {id} = req.params;
   const listing = await Listing.findById(id)
   .populate({path: "reviews", 
        populate: {
            path: "author"
        }
    })
   .populate("owner")
    .select("+category");

   if(!listing){
    req.flash("error", "Sorry! Listing you requested does not exits!");
    return res.redirect("/listings");
   }
   res.render("listings/show.ejs", {
    listing,
    GEOAPIFY_KEY,
    currUser: req.user,
  });
};


//Create Route
module.exports.create = async (req, res) => {
  try {
    // Extract location from the form
    const location = req.body.listing.location;

    // Call Geoapify forward geocoding API
    const geoUrl = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
      location
    )}&apiKey=${process.env.GEOAPIFY_KEY}`;

    const geoResponse = await fetch(geoUrl);
    const geoData = await geoResponse.json();

    if (!geoData.features || geoData.features.length === 0) {
      req.flash("error", "Could not geocode the provided location.");
      return res.redirect("/listings/new");
    }

    const geometry = geoData.features[0].geometry; // GeoJSON format
    // console.log("Geoapify geometry:", geometry);

    // Handle image upload if present
    let image = {};
    if (req.file) {
      image = {
        url: req.file.path,
        filename: req.file.filename,
      };
    }

    // Create new listing
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    if (req.file) newListing.image = image;
    newListing.geometry = geometry;

    // Save to DB
    await newListing.save();

    req.flash("success", "New Listing Created!");
    res.redirect("/listings");

  } catch (err) {
    // console.error("Error creating listing:", err);
    req.flash("error", "Something went wrong while creating the listing.");
    res.redirect("/listings");
  }
};


//Edit route
module.exports.edit = async(req, res)=>{
  let {id} = req.params;
  const listing = await Listing.findById(id);
  if(!listing){
      req.flash("error", "Listing you requested does not exist!");
      return res.redirect("/listings");
  }
  res.render("listings/edit.ejs", { listing });
};

//Update
module.exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
      req.flash("error", "Listing not found!");
      return res.redirect("/listings");
    }

    // Update coordinates if location has changed
    if (req.body.listing.location && req.body.listing.location !== listing.location) {
      const location = req.body.listing.location;
      const geoUrl = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
        location
      )}&apiKey=${process.env.GEOAPIFY_KEY}`;

      const geoResponse = await fetch(geoUrl);
      const geoData = await geoResponse.json();

      if (geoData.features && geoData.features.length > 0) {
        listing.geometry = geoData.features[0].geometry;
        // console.log("Updated coordinates:", listing.geometry);
      } else {
        req.flash("warning", "Could not geocode the new location. Coordinates not updated.");
      }
    }

    // Update listing fields
    Object.assign(listing, req.body.listing);

    // Update image if uploaded
    if (req.file) {
      listing.image = {
        url: req.file.path,
        filename: req.file.filename,
      };
    }

    await listing.save();
    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
  } catch (err) {
    // console.error(err);
    req.flash("error", "Something went wrong while updating the listing.");
    res.redirect("/listings");
  }
};


//Delete 
module.exports.delete = async(req, res)=>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing deleted successfully!");
    res.redirect("/listings");
};