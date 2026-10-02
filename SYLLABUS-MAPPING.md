# CookShare: syllabus mapping

PDF requirement -> implementation

- Node.js + Express REST API -> server.js + routes/controllers
- Modular routes/controllers -> routes/ and controllers/
- MongoDB + Mongoose -> models/ + config/db.js
- Users -> models/User.js
- Recipes -> models/Recipe.js
- Ratings -> models/Rating.js
- Meal plans -> models/MealPlan.js
- JWT authentication -> middleware/authMiddleware.js + authController.js
- Firebase Auth -> utils/firebaseAuth.js + authController.js
- Firebase Storage -> utils/firebaseStorage.js + middleware/uploadMiddleware.js
- File upload middleware -> Multer memoryStorage
- Validation middleware -> validationMiddleware.js
- Recipe CRUD -> recipeController.js
- Recipe search -> GET /api/recipes/search?keyword=...
- Ratings -> ratingController.js
- Meal plans -> mealPlanController.js
- API documentation -> postman-collection.json + README.md
- Socket.io -> not implemented because the PDF does not define a Socket.io endpoint or deliverable.
- Optional nutrition/shopping APIs -> intentionally left out.
