
  const firebaseConfig = {
    apiKey: "AIzaSyCfAyb7INxl0u7Y9ha8VIT-gDqCybs_VI0",
    authDomain: "trial-db-ee9d4.firebaseapp.com",
    projectId: "trial-db-ee9d4",
    storageBucket: "trial-db-ee9d4.appspot.com",
    messagingSenderId: "440827449113",
    appId: "1:440827449113:web:960ffdfc600ac9a1493f88",
    measurementId: "G-GVC6NZV9GS"
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
