
import "https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js";
import "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore-compat.js";
import "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth-compat.js";
import "https://www.gstatic.com/firebasejs/10.7.0/firebase-storage-compat.js";
import "https://www.gstatic.com/firebasejs/10.7.0/firebase-database-compat.js";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
console.log("Initializing Firebase...");
const firebaseConfig = {
  apiKey: "AIzaSyD4knndvLI3q_AJ8WcLdoVdQsjsKBi_T6Q",
  authDomain: "elearning-1c28f.firebaseapp.com",
  projectId: "elearning-1c28f",
  storageBucket: "elearning-1c28f.appspot.com",
  messagingSenderId: "425938723699",
  appId: "1:425938723699:web:3c01a9191c16249e9a1b06",
  measurementId: "G-6K6GR0HMZK"
};
var app = firebase.initializeApp(firebaseConfig);
// Initialize Firebase
var auth = app.auth();
var db = app.firestore();
var storage = app.storage();
var database=app.database();
console.log("Firebase initialization complete.");
export { auth, db,storage,database };
