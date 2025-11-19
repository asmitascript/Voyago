const User = require("../models/user.js");
const Listing = require("../models/listings.js");
const Review = require("../models/review.js");

// Dashboard route
module.exports.dashboard = async (req, res) => {
  const userCount = await User.countDocuments();
  const listingCount = await Listing.countDocuments();
  const reviewCount = await Review.countDocuments();

  const recentListings = await Listing.find().sort({ createdAt: -1 }).limit(5).populate("owner");
  const recentUsers = await User.find().sort({ createdAt: -1 }).limit(5);

  res.render("dashboard/admin.ejs", {
    userCount,
    listingCount,
    reviewCount,
    recentListings,
    recentUsers
  });
};

//allUser
module.exports.allUser = async (req, res) => {
  try {
    const users = await User.find().sort({ joinedAt: -1 });
    res.render("dashboard/alluser.ejs", {users});
  } catch (err) {
    // console.error(err);
    res.status(500).send("Server Error");
  }
}

//allReview
module.exports.allReview = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("author")
      .populate("listing") // get listing title
      .sort({ createdAt: -1 });

    res.render("dashboard/allreviews", { reviews });
  } catch (err) {
    // console.error(err);
    res.status(500).send("Server Error");
  }
};

//deleteUser
module.exports.deleteUser = async (req, res) => {
  const { userId } = req.params;

  // Prevent deleting your own account
  if (req.user._id.equals(userId)) {
    req.flash("error", "You cannot delete your own account!");
    return res.redirect("/admin/user");
  }

  // Find the target user
  const userToDelete = await User.findById(userId);
  if (!userToDelete) {
    req.flash("error", "User not found!");
    return res.redirect("/admin/user");
  }

  // Prevent deleting admin accounts
  if (userToDelete.role === "admin") {
    req.flash("error", "Admin accounts cannot be deleted!");
    return res.redirect("/admin/user");
  }

  // Proceed with deletion
  await User.findByIdAndDelete(userId);
  req.flash("success", "User deleted successfully!");
  res.redirect("/admin/user");
};
