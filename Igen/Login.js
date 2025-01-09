import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";

import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider ,signInWithPopup ,sendPasswordResetEmail} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";

// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyDAlth1sxiP-S3r3fVDXhwadVVnEvpdO6s",
  authDomain: "login-egi-agan.firebaseapp.com",
  databaseURL: "https://login-egi-agan-default-rtdb.firebaseio.com",
  projectId: "login-egi-agan",
  storageBucket: "login-egi-agan.firebasestorage.app",
  messagingSenderId: "395059466114",
  appId: "1:395059466114:web:5c6b0621e9739df6b5c99b"


};



const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth(app)
auth.useDeviceLanguage()

//grab
const spinner = document.getElementById("spinner");
const spinnerG = document.getElementById("spinner-g");

const login= document.getElementById("login");
login.addEventListener("click", function (event) {
 event.preventDefault();
 spinner.style.display = "inline-block";

 let email = document.getElementById("email").value;
 const password = document.getElementById("password").value;

 signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
   const user = userCredential.user;
   window.location.href = "home.html";
   spinner.style.display = "none";
  })
  .catch((error) => {
   const errorCode = error.code;
   const errorMessage = error.message;
   spinner.style.display = "none";
 
alert(errorMessage)
  });

})



const google = document.getElementById("google");
google.addEventListener("click",
 function registerWithGoogle() {
    spinnerG.style.display = "inline-block";
  signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    window.location.href = "home.html";
    spinnerG.style.display = "none";

  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    spinnerG.style.display = "none";
    
alert(errorMessage)

  });



 }
)

const reset = document.getElementById("resetPassword");
reset.addEventListener("click", function(event) {
  event.preventDefault();
  
  const email = document.getElementById("email").value.trim();
  
  console.log(email);
  
  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (email === "") {
    alert("Please enter your email!!");
  } else if (!emailRegex.test(email)) {
    alert("Please enter a valid email address!!");
  } else {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        alert("Password reset email sent!");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorMessage);
      });
  }
});

