# UserDashboardApp

A web application featuring user registration, login, and role-based dashboards using Firebase for authentication and database.

## Introduction
UserDashboardApp is a simple web application that allows users to register, log in, and access role-based dashboards. It uses Firebase for authentication and Firestore for the database.

## Features
- User Registration
- User Login
- Role-based redirection (Admin and Normal User)
- Secure Authentication with Firebase
- Firestore integration for user role management

## Technologies Used
- HTML
- JavaScript
- Firebase Authentication
- Firebase Firestore

## Installation
1. Clone the repository:
   
2. Navigate to the project directory:
    ```sh
    cd UserDashboardApp
    ```
3. Open the project in your preferred code editor.

## Usage
1. Set up a Firebase project and obtain your Firebase configuration details.
2. Replace the placeholders in `firebase-config.js` with your Firebase project configuration:
    ```js
    const firebaseConfig = {
        apiKey: "YOUR_API_KEY",
        authDomain: "YOUR_AUTH_DOMAIN",
        projectId: "YOUR_PROJECT_ID",
        storageBucket: "YOUR_STORAGE_BUCKET",
        messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
        appId: "YOUR_APP_ID"
    };
    ```
3. Open `index.html` in your browser to access the login page.
4. Open `register.html` in your browser to access the registration page.

## Project Structure
```plaintext
UserDashboardApp/
├── admin-dashboard.html
├── dashboard.js
├── firebase-config.js
├── index.html
├── login.js
├── register.html
└── register.js
