const { bucket } = require("../config/firebase");

async function uploadImage(file) {
    if (!file) {
        return "";
    }

    const fileName =
        `recipes/${Date.now()}-${Math.random().toString(36).slice(2)}-${file.originalname}`;

    const firebaseFile = bucket.file(fileName);

    await firebaseFile.save(file.buffer, {
        metadata: {
            contentType: file.mimetype
        }
    });

    // URL for the local Firebase Storage Emulator.
    const imageUrl =
        `http://127.0.0.1:9199/v0/b/${bucket.name}/o/${encodeURIComponent(fileName)}?alt=media`;

    return imageUrl;
}

module.exports = uploadImage;
