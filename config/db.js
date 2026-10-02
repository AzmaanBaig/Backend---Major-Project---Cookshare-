const mongoose = require("mongoose");

async function connectDB() {
    try {
        await mongoose.connect("mongodb://localhost:27017/CookShare");
        console.log("MongoDB connected");
    } catch (error) {
        console.log("MongoDB connection failed:", error.message);
    }
}

module.exports = connectDB;