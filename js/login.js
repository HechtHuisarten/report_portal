import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

// TODO: PASTE YOUR FIREBASE CONFIGURATION OBJECT HERE
const firebaseConfig = {
    apiKey: "AIza....",
    authDomain: "your-project-id.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project-id.appspot.com",
    messagingSenderId: "...",
    appId: "1:..."
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// DOM Elements
const loginButton = document.getElementById('loginButton');
const loader = document.getElementById('loader');

// Listen for login button click
loginButton.addEventListener('click', () => {
    loginButton.classList.add('hidden');
    loader.classList.remove('hidden');

    signInWithPopup(auth, googleProvider)
        .then((result) => {
            // This will trigger the onAuthStateChanged listener, which will handle the redirect.
            console.log("Sign-in successful for:", result.user.displayName);
        })
        .catch((error) => {
            console.error("Authentication Error:", error);
            alert(`Sign-in failed: ${error.message}`);
            loginButton.classList.remove('hidden');
            loader.classList.add('hidden');
        });
});

// Check auth state
onAuthStateChanged(auth, (user) => {
    if (user) {
        // If user is logged in, redirect to the report page
        console.log("User is already logged in. Redirecting to report...");
        window.location.href = 'report.html';
    } else {
        // User is not logged in, show the login button
        console.log("No user logged in. Waiting for sign-in.");
        loginButton.classList.remove('hidden');
        loader.classList.add('hidden');
    }
});
