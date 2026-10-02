const jwt = require("jsonwebtoken");

const JWT_SECRET = "cookshare_secret";

function authMiddleware(req, res, next) {
    const authorization = req.headers.authorization;

    console.log("Authorization header:", authorization);

    if (!authorization || !authorization.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "Please provide a Bearer token"
        });
    }

    const token = authorization.split(/\s+/)[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        console.log("JWT decoded:", decoded);

        req.user = decoded;
        next();
    } catch (error) {
        console.log("JWT error:", error.message);

        res.status(401).json({
            message: "Invalid or expired token"
        });
    }
}

module.exports = authMiddleware;