document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;

            db.collection('users').doc(user.uid).get()
                .then((doc) => {
                    if (doc.exists) {
                        const role = doc.data().role;
                        if (role === 'admin') {
                            window.location.href = 'admin-dashboard.html';
                        } else {
                            window.location.href = 'user-dashboard.html';
                        }
                    }
                });
        })
        .catch((error) => {
            console.error("Error logging in: ", error.message);
        });
});
