// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
          
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDxvgdcFCdB5UGZNQ_LF-B7HnVzXF9dYLY",
    authDomain: "zanciks-b3d79.firebaseapp.com",
    projectId: "zanciks-b3d79",
    storageBucket: "zanciks-b3d79.appspot.com",
    messagingSenderId: "131659056444",
    appId: "1:131659056444:web:02771d26e05af0c3214a39",
    measurementId: "G-DYV8V1MTMB"
};
          
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const entriesRef = firebase.database().ref('guestbook-entries');

function submitEntry() {
    // Get name and comment from form inputs
    const name = document.getElementById('name').value;
    const comment = document.getElementById('comment').value;
  
    // Create entry object
    const entry = {
        name: name,
        comment: comment
    };
  
    // Push the entry to Firebase Realtime Database
    entriesRef.push(entry);
  
    // Reset the form
    document.getElementById('name').value = '';
    document.getElementById('comment').value = '';
}

function renderEntries(entries) {
    const entriesContainer = document.getElementById('entries');
    entriesContainer.innerHTML = '';
  
    for (let i = entries.length - 1; i >= 0; i--) {
        const entry = entries[i];
        const entryElement = document.createElement('div');
        entryElement.innerHTML = `<strong>${entry.name}</strong>: ${entry.comment}`;
        entriesContainer.appendChild(entryElement);
    }
}

function retrieveLastEntries() {
    entriesRef.limitToLast(10).once('value', (snapshot) => {
        const entries = [];
        snapshot.forEach((childSnapshot) => {
        entries.push(childSnapshot.val());
    });
        renderEntries(entries);
    });
}

retrieveLastEntries();