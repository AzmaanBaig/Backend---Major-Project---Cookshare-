const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    firebaseUid: String
});

module.exports = mongoose.model("User", userSchema);
