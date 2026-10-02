const { FIREBASE_API_KEY } = require("../config/firebase");

async function sendFirebaseRequest(endpoint, email, password) {
    const url =
        `https://identitytoolkit.googleapis.com/v1/accounts:${endpoint}?key=${FIREBASE_API_KEY}`;

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email,
            password,
            returnSecureToken: true
        })
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error?.message || "Firebase Authentication failed");
    }

    return data;
}

async function firebaseRegister(email, password) {
    return sendFirebaseRequest("signUp", email, password);
}

async function firebaseLogin(email, password) {
    return sendFirebaseRequest("signInWithPassword", email, password);
}

module.exports = {
    firebaseRegister,
    firebaseLogin
};
