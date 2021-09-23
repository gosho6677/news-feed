const admin = require("firebase-admin");

// local pc path, instead of .ENV 
const serviceAccount = require("../../../news-feed-dc9fa-43ee9c0f1f63.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// const firebase = admin.initializeApp();
const auth = admin.auth();

module.exports = auth;