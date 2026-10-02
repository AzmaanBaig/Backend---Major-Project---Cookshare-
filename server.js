const express = require("express");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const recipeRoutes = require("./routes/recipeRoutes");
const ratingRoutes = require("./routes/ratingRoutes");
const mealPlanRoutes = require("./routes/mealPlanRoutes");

// Load Firebase configuration so the Storage Emulator is connected.
require("./config/firebase");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.get("/", (req, res) => {
    res.send("CookShare Backend is running");
});

app.use("/api/auth", authRoutes);
app.use("/api/recipes", recipeRoutes);
app.use("/api/ratings", ratingRoutes);
app.use("/api/meal-plans", mealPlanRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});