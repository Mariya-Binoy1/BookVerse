import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

        const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
     if (!user) {
          // If no user is logged in, redirect to the login page
         window.location.href = "register.html";
        }
      });