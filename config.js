const { initializeApp } = require("firebase/app");
const admin = require("firebase-admin");
const serviceAccount = require("./assets/firebase-adminsdk-ywrye@cyberstoremanagement-4b1bf.iam.gserviceaccount.json");
const firebaseConfig = {
  apiKey: "AIzaSyBVwYlh6OWsyi9gqyg9wJNo2ttWdPdbyCE",
  authDomain: "cyberstoremanagement-4b1bf.firebaseapp.com",
  projectId: "cyberstoremanagement-4b1bf",
  storageBucket: "cyberstoremanagement-4b1bf.appspot.com",
  messagingSenderId: "1051886271858",
  appId: "1:1051886271858:web:2e5cbe2f48d08d947eb1eb",
};
const firebase = initializeApp(firebaseConfig);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://cyberstoremanagement-4b1bf.appspot.com",
});
const {
  getFirestore,
  Timestamp,
  FieldValue,
  Filter,
} = require("firebase-admin/firestore");
const db = getFirestore();
module.exports = { firebase, db };
