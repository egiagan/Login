document.getElementById('logout').addEventListener('click', function() {
    auth.signOut().then(() => {
        window.location.href = 'index.html';
    }).catch((error) => {
        console.error("Error signing out: ", error.message);
    });
});
