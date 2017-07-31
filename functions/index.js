const functions = require('firebase-functions');
const admin = require("firebase-admin");
const serviceAccount = require('./serviceAccount.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://react-native-advanced-concepts.firebaseio.com"
});

const createUser = require("./create_user");
const reqOneTimePass = require("./reqOneTimePass");
const loginWithPass = require('./loginWithPass');


exports.createUser = functions.https.onRequest(createUser);
exports.reqOneTimePass = functions.https.onRequest(reqOneTimePass);
exports.loginWithPass = functions.https.onRequest(loginWithPass);