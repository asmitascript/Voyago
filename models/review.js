const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Listing = require("./listings.js");


const reviewSchema = new Schema({
    comment: String,
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    listing: { 
        type: Schema.Types.ObjectId, 
        ref: "Listing" 
    }
});

module.exports = mongoose.model("Review", reviewSchema);