function validateRecipe(req, res, next) {
    if (!req.body.title) {
        return res.status(400).json({ message: "Recipe title is required" });
    }

    if (!req.body.description) {
        return res.status(400).json({ message: "Recipe description is required" });
    }

    next();
}

module.exports = validateRecipe;
