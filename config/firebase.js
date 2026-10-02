const admin = require("firebase-admin");

const FIREBASE_PROJECT_ID = "cookshare-59f42";
const FIREBASE_API_KEY = "AIzaSyCME7O61wPixSn-y3VEJBUEy00nf3RqmSM";


process.env.FIREBASE_STORAGE_EMULATOR_HOST = "127.0.0.1:9199";

admin.initializeApp({
    projectId: FIREBASE_PROJECT_ID,
    storageBucket: `${FIREBASE_PROJECT_ID}.firebasestorage.app`
});

const bucket = admin.storage().bucket();

module.exports = {
    admin,
    bucket,
    FIREBASE_PROJECT_ID,
    FIREBASE_API_KEY
};