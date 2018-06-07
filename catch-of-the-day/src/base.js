import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCfADhvyBMlRaGwYBERbXGTHhj-yYZwl-Y",
  authDomain: "muddyb-react-for-beginners.firebaseapp.com",
  databaseURL: "https://muddyb-react-for-beginners.firebaseio.com",
  projectId: "muddyb-react-for-beginners",
  storageBucket: "muddyb-react-for-beginners.appspot.com",
  messagingSenderId: "234420924679"
});

const base = Rebase.createClass(firebaseApp.database());

// This is  named export
export { firebaseApp };

// This is a default export
export default base;
