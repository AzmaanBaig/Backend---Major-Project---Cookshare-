# CookShare Backend

Simple college case-study backend based on the required Node.js, Express.js, MongoDB/Mongoose, JWT, Firebase Auth, Firebase Storage and Multer topics.

## Important: Firebase Storage without paying for Blaze

This version uses the **Firebase Local Storage Emulator**.

That means recipe images are uploaded through Firebase Storage APIs, but the files stay on your computer while you develop and test. Firebase documents the Storage Emulator for local development and lists port `9199` as its default port. The Emulator Suite is not a production replacement for Firebase Storage.

## Technologies

- Node.js
- Express.js
- MongoDB
- Mongoose
- Firebase Authentication
- JWT
- Firebase Storage Emulator
- Multer

## Before running

### 1. Install Node.js

Use Node.js 18 or newer because the project uses Node's built-in `fetch()` for the Firebase Authentication REST API.

### 2. Install dependencies

Open Terminal inside this folder:

```bash
npm install
```

### 3. Set up MongoDB

Create a MongoDB Atlas database and copy its connection string.

Open:

`config/db.js`

Replace:

```js
"YOUR_MONGODB_CONNECTION_STRING"
```

with your MongoDB connection string.

### 4. Set up Firebase Authentication

Create/open your Firebase project.

In Firebase Console:

- Go to Authentication.
- Open Sign-in method.
- Enable Email/Password.
- Open Project Settings.
- Copy the Web API Key.

Open:

`config/firebase.js`

Replace:

```js
const FIREBASE_PROJECT_ID = "YOUR_FIREBASE_PROJECT_ID";
const FIREBASE_API_KEY = "YOUR_FIREBASE_API_KEY";
```

with your Firebase project ID and Web API key.

You do **not** need to create a paid Cloud Storage bucket for this local version.

### 5. Install Firebase CLI

If you do not already have it:

```bash
npm install -g firebase-tools
```

Check it:

```bash
firebase --version
```

### 6. Start Firebase Storage Emulator

Inside the CookShare folder:

```bash
firebase emulators:start --only storage
```

Keep this Terminal window running.

The Storage Emulator uses port `9199` and the Emulator UI uses port `4000` in this project.

Open the Emulator UI if you want to see uploaded files:

`http://localhost:4000`

### 7. Start CookShare

Open a **second Terminal window** in the CookShare folder:

```bash
npm start
```

Your backend will run at:

`http://localhost:3000`

## Authentication flow

1. `POST /api/auth/register`
2. Firebase Authentication creates the account.
3. MongoDB stores the user's name, email and Firebase UID.
4. `POST /api/auth/login`
5. Firebase checks the email and password.
6. CookShare creates a JWT.
7. Send that JWT as:

```text
Authorization: Bearer YOUR_TOKEN
```

The JWT protects recipes, ratings and meal-plan operations that require login.

## API endpoints

### Auth

- POST `/api/auth/register`
- POST `/api/auth/login`

### Recipes

- GET `/api/recipes`
- GET `/api/recipes/:id`
- POST `/api/recipes`
- PUT `/api/recipes/:id`
- DELETE `/api/recipes/:id`
- GET `/api/recipes/search?keyword=vegan`

### Ratings

- POST `/api/ratings`
- GET `/api/ratings`
- GET `/api/ratings/recipe/:id`

### Meal Plans

- POST `/api/meal-plans`
- GET `/api/meal-plans`
- GET `/api/meal-plans/:id`

## Testing recipe image upload in Postman

For `POST /api/recipes`:

- Method: POST
- URL: `http://localhost:3000/api/recipes`
- Authorization: Bearer Token
- Body: form-data

Use these fields:

- `title` = Chicken Pasta
- `description` = Simple pasta recipe
- `ingredients` = pasta,chicken,salt
- `steps` = boil pasta,cook chicken,mix together
- `category` = dinner
- `image` = choose an image file

The image is uploaded to the local Firebase Storage Emulator and the returned `imageUrl` is stored in MongoDB.

## Files to understand for viva

- `server.js` -> starts Express and connects routes
- `config/db.js` -> MongoDB connection
- `config/firebase.js` -> Firebase setup and Storage Emulator
- `utils/firebaseAuth.js` -> Firebase register/login requests
- `utils/firebaseStorage.js` -> Firebase Storage image upload
- `models/` -> Mongoose schemas
- `routes/` -> API routes
- `controllers/` -> API logic
- `middleware/authMiddleware.js` -> JWT protection
- `middleware/uploadMiddleware.js` -> Multer file upload
- `middleware/validationMiddleware.js` -> simple recipe validation

## Important

- Do not use `require("dotenv").config()` in this project.
- Do not upload private keys or passwords to GitHub.
- The Storage Emulator is for local development/demo. It is not production Firebase Storage.
- Socket.io is not included because the case-study requirements do not define a Socket.io endpoint or deliverable.
