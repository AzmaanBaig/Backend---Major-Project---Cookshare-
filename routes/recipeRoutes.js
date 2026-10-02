const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const validateRecipe = require("../middleware/validationMiddleware");

const {
    createRecipe,
    getRecipes,
    getRecipe,
    updateRecipe,
    deleteRecipe,
    searchRecipes
} = require("../controllers/recipeController");

const router = express.Router();

router.get("/", getRecipes);
router.get("/search", searchRecipes);
router.get("/:id", getRecipe);

router.post(
    "/",
    authMiddleware,
    upload.single("image"),
    validateRecipe,
    createRecipe
);

router.put("/:id", authMiddleware, updateRecipe);
router.delete("/:id", authMiddleware, deleteRecipe);

module.exports = router;
