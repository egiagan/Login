var firebaseConfig = {
  apiKey: "AIzaSyDAlth1sxiP-S3r3fVDXhwadVVnEvpdO6s",
  authDomain: "login-egi-agan.firebaseapp.com",
  databaseURL: "https://login-egi-agan-default-rtdb.firebaseio.com",
  projectId: "login-egi-agan",
  storageBucket: "login-egi-agan.firebasestorage.app",
  messagingSenderId: "395059466114",
  appId: "1:395059466114:web:5c6b0621e9739df6b5c99b"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  firebase.auth.Auth.Persistence.LOCAL;

  $("#btn-login").click(function()
  {
      var email = $("#email").val();
      var password = $("#password").val();

      if(email != ""  &&  password != "")
      {
          var result = firebase.auth().signInWithEmailAndPassword(email, password); 

          result.catch(function(error)
          {
              var errorCode = error.code;
              var errorMessage = error.message;

              console.log(errorCode);
              onsole.log(errorMessage);

              window.alert("Message : " + errorMessage);
          });
      }
      else
      {
          window.alert("Form is incomplete. Please fill out all fields.");
      }
  });




  $("#btn-signup").click(function()
  {
      var nama = $("#nama").val();
      var phone = $("#phone").val();
      var email = $("#email").val();
      var cPassword = $("#Password").val();
      var cPassword = $("#confirmPassword").val();

      if(nama != ""  &&  phone != ""  &&  email != ""  &&  Password != ""  &&  CPassword != "")
      {
           if(password != ""  &&  cPassword != "")
                    {
            var result = firebase.auth().createUserWithEmailAndPassword(email, password); 

            result.catch(function(error)
            {
                var errorCode = error.code;
                var errorMessage = error.message;
  
                console.log(errorCode);
                onsole.log(errorMessage);
  
                window.alert("Message : " + errorMessage);
            });
          }
          else
          {
            window.alert("Password do not match with the Confirm Password.");
          }
      }
      else
      {
          window.alert("Form is incomplete. Please fill out all fields.");
      }
  });



  $("#btn-resetPassword").click(function()
  {
     var auth = firebase.auth();
     var email = $("#email").val();

     if(email != "")
     {
         auth.sendPasswordResetEmail(email).then(function()
         {
            window.alert("Email has been sent to you, Please check and verify.");
         })
         .catch(function(error)
         {
            var errorCode = error.code;
            var errorMessage = error.message;

            console.log(errorCode);
            onsole.log(errorMessage);

            window.alert("Message : " + errorMessage);
         });
     }
     else
     {
        window.alert("Please write your email first.");
     }
  });



  $("#btn-logout").click(function()
  {
     firebase.auth().signOut();
  });




  $("#btn-update").click(function()
  {
    var phone = $("#phone").val();
    var fName = $("#firstName").val();
    var sName = $("#secondName").val();
    var country = $("#country").val();
    var gender = $("#gender").val();

    var rootRef = firebase.database().ref().child("Users");
    var userID = firebase.auth().currentUser.uid;
    var usersRef = rootRef.child(userID);

    if(fName!="" && sName!="" && phone!="" && country!="" && gender!="")
    {
        var userData = 
        {
            "phone": phone,
            "country": country,
            "firstName": fName,
            "secondName": sName,
            "gender": gender,
        };

        usersRef.set(userData, function(error)
        {
            if(error)
            {
                var errorCode = error.code;
                var errorMessage = error.message;

                console.log(errorCode);
                onsole.log(errorMessage);

                window.alert("Message : " + errorMessage);
            }
            else
            {
                window.location.href = "index.html";
            }
        });
    }
    else
    {
        window.alert("Form is incomplete. Please fill out all fields.");
    }
  });


function switchView(view)
{
    $.get({
        url:view,
        cache:false,
    })
    .then(function(data){
        $("#container").html(data);
    });
}
