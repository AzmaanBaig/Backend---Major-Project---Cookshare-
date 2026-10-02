const Recipe = require("../models/Recipe");
const uploadImage = require("../utils/firebaseStorage");

function convertToArray(value) {
    if (!value) {
        return [];
    }

    if (Array.isArray(value)) {
        return value;
    }

    return value.split(",").map(item => item.trim()).filter(item => item);
}

async function createRecipe(req, res) {
    try {
        const imageUrl = await uploadImage(req.file);

        const recipe = await Recipe.create({
            title: req.body.title,
            description: req.body.description,
            ingredients: convertToArray(req.body.ingredients),
            steps: convertToArray(req.body.steps),
            category: req.body.category,
            imageUrl,
            author: req.user.id
        });

        res.status(201).json(recipe);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function getRecipes(req, res) {
    try {
        const recipes = await Recipe.find()
            .populate("author", "name email");

        res.json(recipes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function getRecipe(req, res) {
    try {
        const recipe = await Recipe.findById(req.params.id)
            .populate("author", "name email");

        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }

        res.json(recipe);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function updateRecipe(req, res) {
    try {
        const recipe = await Recipe.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }

        res.json(recipe);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function deleteRecipe(req, res) {
    try {
        const recipe = await Recipe.findByIdAndDelete(req.params.id);

        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }

        res.json({ message: "Recipe deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function searchRecipes(req, res) {
    try {
        const keyword = req.query.keyword || "";

        const recipes = await Recipe.find({
            title: { $regex: keyword, $options: "i" }
        });

        res.json(recipes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createRecipe,
    getRecipes,
    getRecipe,
    updateRecipe,
    deleteRecipe,
    searchRecipes
};
