const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");

const {
    createMealPlan,
    getMealPlans,
    getMealPlan
} = require("../controllers/mealPlanController");

const router = express.Router();

router.post("/", authMiddleware, createMealPlan);
router.get("/", authMiddleware, getMealPlans);
router.get("/:id", authMiddleware, getMealPlan);

module.exports = router;