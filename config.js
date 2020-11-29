import firebase from "firebase";
require("firebase/firestore");

var firebaseConfig = {
  apiKey: "AIzaSyBrRi5DfSHbIMRPKLNbypIcM8Y-poeYqE4",
  authDomain: "barterapp-3662c.firebaseapp.com",
  databaseURL: "https://barterapp-3662c.firebaseio.com",
  projectId: "barterapp-3662c",
  storageBucket: "barterapp-3662c.appspot.com",
  messagingSenderId: "576772912186",
  appId: "1:576772912186:web:2056d9b2b8ec137ddab103",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();
