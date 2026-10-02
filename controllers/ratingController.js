const Rating = require("../models/Rating");

async function addRating(req, res) {
    try {
        const rating = await Rating.create({
            recipe: req.body.recipe,
            user: req.user.id,
            rating: req.body.rating,
            review: req.body.review
        });

        res.status(201).json(rating);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function getRatings(req, res) {
    try {
        const ratings = await Rating.find()
            .populate("user", "name")
            .populate("recipe", "title");

        res.json(ratings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function getRecipeRatings(req, res) {
    try {
        const ratings = await Rating.find({
            recipe: req.params.id
        }).populate("user", "name");

        res.json(ratings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    addRating,
    getRatings,
    getRecipeRatings
};