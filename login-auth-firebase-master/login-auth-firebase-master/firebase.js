
  const firebaseConfig = {
        apiKey: "AIzaSyDAlth1sxiP-S3r3fVDXhwadVVnEvpdO6s",
        authDomain: "login-egi-agan.firebaseapp.com",
        databaseURL: "https://login-egi-agan-default-rtdb.firebaseio.com",
        projectId: "login-egi-agan",
        storageBucket: "login-egi-agan.firebasestorage.app",
        messagingSenderId: "395059466114",
        appId: "1:395059466114:web:5c6b0621e9739df6b5c99b"
  };

  // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);

    // add event listeners
        document.getElementById('signin').addEventListener('click', GoogleLogin)

        //For Authentication logic
        //1) Create a provider -- Google Authentication object
        let provider = new GoogleAuthProvider() 

        //.then - js promises, pass them. it will return a callback ie res is passed in the console.log(res) or used in other places 
        
        export function GoogleLogin(){
            console.log('Signin button clicked');
            //2) caall the logic for auth
            signInWithPopup(provider).then(res => { //auth is a predefined method with in firebase, pass a provider in the signInWith... 
                console.log(res)
            }).catch(e => { //catch incase there's an issue 
                console.log(e)
            })   
        }
