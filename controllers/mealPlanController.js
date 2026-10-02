const MealPlan = require("../models/MealPlan");

async function createMealPlan(req, res) {
    try {
        const mealPlan = await MealPlan.create({
            user: req.user.id,
            name: req.body.name,
            recipes: req.body.recipes
        });

        res.status(201).json(mealPlan);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function getMealPlans(req, res) {
    try {
        const mealPlans = await MealPlan.find({
            user: req.user.id
        }).populate("recipes");

        res.json(mealPlans);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function getMealPlan(req, res) {
    try {
        const mealPlan = await MealPlan.findById(req.params.id)
            .populate("recipes");

        if (!mealPlan) {
            return res.status(404).json({ message: "Meal plan not found" });
        }

        res.json(mealPlan);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createMealPlan,
    getMealPlans,
    getMealPlan
};