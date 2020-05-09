// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyB1Fkalt-xYkmAB_JJVRMPvcQzoCJLgNRw",
    authDomain: "fir-studyjam-a3bfa.firebaseapp.com",
    databaseURL: "https://fir-studyjam-a3bfa.firebaseio.com",
    projectId: "fir-studyjam-a3bfa",
    storageBucket: "fir-studyjam-a3bfa.appspot.com",
    messagingSenderId: "482611414505",
    appId: "1:482611414505:web:1e5e1058950cf86aca3778",
    measurementId: "G-FS1LZ70RBX"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var firestore = firebase.firestore();