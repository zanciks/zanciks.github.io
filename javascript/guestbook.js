import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-analytics.js";
const firebaseConfig = {
    apiKey: "AIzaSyDxvgdcFCdB5UGZNQ_LF-B7HnVzXF9dYLY",
    authDomain: "zanciks-b3d79.firebaseapp.com",
    databaseURL: "https://zanciks-b3d79-default-rtdb.firebaseio.com",
    projectId: "zanciks-b3d79",
    storageBucket: "zanciks-b3d79.appspot.com",
    messagingSenderId: "131659056444",
    appId: "1:131659056444:web:02771d26e05af0c3214a39",
    measurementId: "G-DYV8V1MTMB"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);

function submit() {
    var data = {
        name: document.getElementById("name").value,
        comment: document.getElementById("comment").value,
    }
    const entriesRef = push(ref(db), data);
    const entryKey = key(entriesRef);

    console.log("new entry added with key: " + entryKey);
}