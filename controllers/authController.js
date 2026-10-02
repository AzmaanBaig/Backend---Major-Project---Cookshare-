const jwt = require("jsonwebtoken");

const User = require("../models/User");
const {
    firebaseRegister,
    firebaseLogin
} = require("../utils/firebaseAuth");

const JWT_SECRET = "cookshare_secret";

async function register(req, res) {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Name, email and password are required"
            });
        }

        const oldUser = await User.findOne({ email });

        if (oldUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Create the account in Firebase Authentication.
        const firebaseUser = await firebaseRegister(email, password);

        // Store basic user information in MongoDB.
        const user = await User.create({
            name,
            email,
            firebaseUid: firebaseUser.localId
        });

        res.status(201).json({
            message: "User registered successfully",
            user
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body;

        // Firebase checks the email and password.
        const firebaseUser = await firebaseLogin(email, password);

        const user = await User.findOne({
            firebaseUid: firebaseUser.localId
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found in MongoDB"
            });
        }

        // Our backend creates its own JWT for protected API routes.
        const token = jwt.sign(
            { id: user._id },
            JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.json({
            message: "Login successful",
            token
        });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
}

module.exports = { register, login };
