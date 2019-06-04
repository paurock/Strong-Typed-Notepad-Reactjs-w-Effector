import * as firebase from "firebase/app";
import "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD6HSnUyy4sf96JPvyd9Npw5tkqmawGM6U",
  authDomain: "strong-typed-notepad.firebaseapp.com",
  databaseURL: "https://strong-typed-notepad.firebaseio.com",
  projectId: "strong-typed-notepad",
  storageBucket: "strong-typed-notepad.appspot.com",
  messagingSenderId: "950420018433",
  appId: "1:950420018433:web:6c6fb4b8186ad015"
};
// Initialize Firebase
export default (!firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app());
