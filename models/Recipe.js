const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
    title: String,
    description: String,
    ingredients: [String],
    steps: [String],
    category: String,
    imageUrl: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

module.exports = mongoose.model("Recipe", recipeSchema);