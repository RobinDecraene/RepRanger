import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAOgmomBXzeoJ7sDOmo0t5WQ4JnWaxnpj4",
  authDomain: "repranger-b8691.firebaseapp.com",
  databaseURL: "https://repranger-b8691-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "repranger-b8691",
  storageBucket: "repranger-b8691.appspot.com",
  messagingSenderId: "25221004349",
  appId: "1:25221004349:web:61efec6a9407a170e8be54"
};

// Initialize Firebase
if (!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}

export { firebase };