import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import {onAuthStateChanged, getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js';
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-storage.js";
import { getFirestore, doc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";
const firebaseConfig = {
  apiKey: "AIzaSyD4knndvLI3q_AJ8WcLdoVdQsjsKBi_T6Q",
  authDomain: "elearning-1c28f.firebaseapp.com",
  projectId: "elearning-1c28f",
  storageBucket: "elearning-1c28f.appspot.com",
  messagingSenderId: "425938723699",
  appId: "1:425938723699:web:3c01a9191c16249e9a1b06",
  measurementId: "G-6K6GR0HMZK"
};
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  
  const storage = getStorage();
  const db = getFirestore();
  
  // Vérifiez si l'utilisateur est connecté seulement après que la page est chargée
  onAuthStateChanged(auth, (user) => {
    console.log('Auth state changed:', user);
    if (user) {
    
      console.log('User is signed in:', user);
      console.log('User id:', user.uid);
      
      if (window.location.pathname === 'pages/homm.html' || window.location.pathname === '/index.html') {
        console.log('Redirecting to homm.html');
        window.location.href = 'pages/homm.html';
      }
    } else {
      console.log('User is not signed in');
      if (window.location.pathname !== '/signin.html' && window.location.pathname !== '/signup.html') {
        console.log('Redirecting to index.html');
        window.location.href = 'pages/signin.html';
      }
    }
  });
  // Exportez l'objet auth directement
  export { app, auth,};