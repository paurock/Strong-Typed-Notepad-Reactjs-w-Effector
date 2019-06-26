/* ///Local Storage///
const readLS = () => localStorage.getItem("effector-notes"); //Fn that read data with your label from LS
const writeLS = newItem =>
  localStorage.setItem("effector-notes", JSON.stringify(newItem)); //Fn that write your object in LS
const notesLS = readLS();
const initialState = data => (data !== null ? data : "[]"); 

//sessionStorage.clear();
const writeSS = (key, newItem) =>
  sessionStorage.setItem(key, JSON.stringify(newItem));

const readSS = key => JSON.parse(sessionStorage.getItem(key));
*/
const stopGetNotes = createEffect("stop to get notes", {
  handler(x) {console.log("filtered", x)}
  })
 
forward({
  from: $counter.updates.filter({
    fn: x => x<=notesPerPage
  }), 
  to: stopGetNotes, 
})


const getArrFromFirebase = initArr =>
  getDocRef()
    .orderBy("noteNumber", "asc")
    .get()
    .then(snapshot =>
      snapshot.forEach(doc =>
        pushDocIntoArray(initArr, doc.data(), doc.data().noteNumber, doc.id)
      )
    )
    .then(() => initArr)
    .catch(err => console.log(err));

auth
  .sendPasswordResetEmail()
  .then(() => {
    // Email sent.
  })
  .catch(error => {
    // An error happened.
  });

document.querySelector("span.forgot-password").style = "display:none";
document.querySelector(".email").value = "Your e-mail here";
document.querySelector(".password").style = "display:none;";
document.querySelector("button.signin").innerHTML = "Reset password";
document.querySelector("button.signin").style =
  "margin-bottom:10px; width:100px";

import * as firebase from "firebase";

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
