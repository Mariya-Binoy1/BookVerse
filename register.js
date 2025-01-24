// Import the functions you need from the SDKs you need
console.log("it is working");
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDOXh2tUejXBo_dWMQU9JG5ruupkXi7id4",
  authDomain: "login-page-e14ef.firebaseapp.com",
  projectId: "login-page-e14ef",
  storageBucket: "login-page-e14ef.firebasestorage.app",
  messagingSenderId: "973790820495",
  appId: "1:973790820495:web:3171ffd84469f9cfbc18fa",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

// Add event listener to the signup button
const signupBtn = document.getElementById("signup-btn");
if (signupBtn) {
  signupBtn.addEventListener("click", function (event) {
    event.preventDefault();

    // Get email and password inputs
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    // Call Firebase Auth API to create a user
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // User account created successfully
        const user = userCredential.user;
        console.log("User created:", user);

        // Access secure token (optional)
        const idToken = user.accessToken; // Secure token
        console.log("Secure Token:", idToken);

        alert("Account created successfully!");
        window.location.href = "home.html"; // Redirect to home page after successful signup
      })
      .catch((error) => {
        // Handle errors
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error:", errorCode, errorMessage);

        if (errorCode === "auth/email-already-in-use") {
          alert("This email is already in use. Please try another one.");
        } else if (errorCode === "auth/weak-password") {
          alert("Password should be at least 6 characters long.");
        } else if (errorCode === "auth/invalid-email") {
          alert("Please enter a valid email address.");
        } else {
          alert("An error occurred: " + errorMessage);
        }
      });
  });
} else {
  console.error("Signup button not found in the DOM.");
}

// Add event listener to the login button
const loginBtn = document.getElementById("submit-button");
if (loginBtn) {
  loginBtn.addEventListener("click", function (event) {
    event.preventDefault();

    // Get email and password inputs
    const email = document.getElementById("emails").value;
    const password = document.getElementById("passwords").value;

    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    // Call Firebase Auth API to sign in the user
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // User logged in successfully
        const user = userCredential.user;
        console.log("User logged in:", user);

        // Access secure token (optional)
        const idToken = user.accessToken; // Secure token
        console.log("Secure Token:", idToken);

        alert("Login successful!");
        window.location.href = "home.html"; // Redirect to home page after successful login
      })
      .catch((error) => {
        // Handle errors
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error:", errorCode, errorMessage);

        if (errorCode === "auth/wrong-password") {
          alert("Incorrect password. Please try again.");
        } else if (errorCode === "auth/user-not-found") {
          alert("No user found with this email. Please sign up first.");
        } else if (errorCode === "auth/invalid-email") {
          alert("Please enter a valid email address.");
        } else {
          alert("An error occurred: " + errorMessage);
        }
      });
  });
} else {
  console.error("Login button not found in the DOM.");
}
