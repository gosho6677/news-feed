const admin = require("firebase-admin");

// local pc path, instead of .ENV 
const serviceAccount = require("./firebaseServiceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// const firebase = admin.initializeApp();
const auth = admin.auth();

module.exports = auth;