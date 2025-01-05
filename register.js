document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const role = document.getElementById('register-role').value;

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;

            db.collection('users').doc(user.uid).set({
                email: email,
                role: role
            }).then(() => {
                if (role === 'admin') {
                    window.location.href = 'admin-dashboard.html';
                } else {
                    window.location.href = 'user-dashboard.html';
                }
            });
        })
        .catch((error) => {
            console.error("Error signing up: ", error.message);
        });
});
