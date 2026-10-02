const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");

const {
    addRating,
    getRatings,
    getRecipeRatings
} = require("../controllers/ratingController");

const router = express.Router();

router.post("/", authMiddleware, addRating);
router.get("/", getRatings);
router.get("/recipe/:id", getRecipeRatings);

module.exports = router;