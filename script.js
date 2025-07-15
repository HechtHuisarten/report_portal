// Import functions from the Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { 
    getAuth, 
    onAuthStateChanged, 
    GoogleAuthProvider, 
    signInWithPopup, 
    signOut 
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

// --- FIREBASE CONFIGURATION ---
// TODO: PASTE YOUR FIREBASE CONFIGURATION OBJECT HERE
const firebaseConfig = {
  apiKey: "AIza....",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "...",
  appId: "1:..."
};

// --- INITIALIZE FIREBASE & AUTH ---
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// --- DOM ELEMENT REFERENCES ---
const loginButton = document.getElementById('loginButton');
const logoutButton = document.getElementById('logoutButton');
const userInfo = document.getElementById('userInfo');
const reportContainer = document.getElementById('reportContainer');

// --- AUTHENTICATION LOGIC ---

// Sign-in with Google
loginButton.addEventListener('click', () => {
    signInWithPopup(auth, googleProvider)
        .then((result) => {
            console.log("✅ User signed in successfully:", result.user.displayName);
        })
        .catch((error) => {
            console.error("Authentication Error:", error);
            alert(`Sign-in failed. Error: ${error.message}`);
        });
});

// Sign-out
logoutButton.addEventListener('click', () => {
    signOut(auth)
        .then(() => {
            console.log("👋 User signed out.");
        })
        .catch((error) => {
            console.error("Sign-out Error:", error);
        });
});

// --- AUTH STATE MANAGEMENT ---
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in
        console.log("Auth state changed: Logged in as", user.displayName);
        userInfo.textContent = `Welcome, ${user.displayName}`;
        userInfo.classList.remove('hidden');
        logoutButton.classList.remove('hidden');
        loginButton.classList.add('hidden');
        
        loadSecureReport(user);
    } else {
        // User is signed out
        console.log("Auth state changed: Logged out");
        userInfo.textContent = '';
        userInfo.classList.add('hidden');
        logoutButton.classList.add('hidden');
        loginButton.classList.remove('hidden');
        
        // Reset the report container
        reportContainer.innerHTML = '<p>Please sign in to view the report.</p>';
    }
});

/**
 * Placeholder function to load the secure report.
 * In a real-world scenario, this function would fetch an embed token from a secure backend (e.g., Firebase Function)
 * and then use a library like powerbi-client to embed the report into the `reportContainer`.
 * @param {object} user - The authenticated Firebase user object.
 */
async function loadSecureReport(user) {
    console.log("User authenticated, ready to fetch embed token for:", user.uid);

    // Update UI to show a loading state
    reportContainer.innerHTML = `
        <div class="text-center">
            <h3>Loading Secure Report...</h3>
            <div class="spinner-border text-primary mt-2" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <p class="mt-3">In a real application, we would now call our backend/Firebase Function to get an embed token and render the report.</p>
        </div>`;
    
    // **Next Step:** Here you would typically make a fetch call:
    // const response = await fetch('YOUR_FIREBASE_FUNCTION_URL', {
    //   headers: { 'Authorization': `Bearer ${await user.getIdToken()}` }
    // });
    // const embedConfig = await response.json();
    // powerbi.embed(reportContainer, embedConfig);
}
