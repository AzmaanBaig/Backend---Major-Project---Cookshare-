const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
    recipe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recipe"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    rating: Number,
    review: String
});

module.exports = mongoose.model("Rating", ratingSchema);