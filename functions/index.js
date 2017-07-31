require('dotenv').config();
const functions = require('firebase-functions');
const admin = require("firebase-admin");

const serviceAccount = {
    "type": "service_account",
    "project_id": "react-native-advanced-concepts",
    "private_key_id": process.env.PRIVATE_KEY_ID,
    "private_key": process.env.PRIVATE_KEY,
    "client_email": "firebase-adminsdk-n44qa@react-native-advanced-concepts.iam.gserviceaccount.com",
    "client_id": "114113339143902808295",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://accounts.google.com/o/oauth2/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-n44qa%40react-native-advanced-concepts.iam.gserviceaccount.com"
  };

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