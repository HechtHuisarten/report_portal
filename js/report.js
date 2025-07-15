import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

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

// DOM Elements
const logoutButton = document.getElementById('logoutButton');
const userInfo = document.getElementById('userInfo');
const reportContainer = document.getElementById('reportContainer');

// Listen for logout button click
logoutButton.addEventListener('click', () => {
    signOut(auth).catch((error) => console.error("Sign-out error", error));
});

// Check auth state to protect the page
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, display info and load report
        userInfo.textContent = `Welcome, ${user.displayName}`;
        loadSecureReport(user);
    } else {
        // User is not signed in, redirect to login page
        console.log("No user found, redirecting to login page.");
        window.location.href = 'index.html';
    }
});

// Function to load the secure report content
async function loadSecureReport(user) {
    console.log("User authenticated, ready to fetch embed token for:", user.uid);
    reportContainer.innerHTML = `
        <div class="text-center">
            <h3>Loading Secure Report...</h3>
            <div class="spinner-border text-primary mt-2" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <p class="mt-3">In a real application, we would now call our backend/Firebase Function to get an embed token and render the report.</p>
        </div>`;
}
