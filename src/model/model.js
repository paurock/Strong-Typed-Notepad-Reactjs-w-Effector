import { createStore, createEvent, createEffect } from "effector";
import firebase from "../configFB";
import "firebase/auth"; 
//set max of notes per page
const NOTES_PER_PAGE = 4 

export const increment = createEvent(); 
const $counter = createStore(NOTES_PER_PAGE) // set store to max number of notes at a page
//fn increments counter if mouse wheel up and decrements if down && stop dispaying notes if reach max noteNomber
  .on(increment, (counter, e) => (e.deltaY< 0) ? counter + 1: (counter<NOTES_PER_PAGE) ? counter : counter-1)

export const auth = firebase.auth();
//DB
const db = firebase.firestore();
//Notes
const notes = () => [];

const pushDocIntoArray = (arr, obj, noteNumber, id) =>
  arr.push({ ...obj, noteNumber, id })

//Set ref to docs in Firebase firestore
const getDocRef = () => {
  const user = auth.currentUser; // return object if signedin and null if not
  return user
    ? db //Reading Data from Firebase server//
        .collection("userData")
        .doc(user.uid)
        .collection("notes")
    : db
        .collection("userData")
        .doc()
        .collection("notes");
};

//There are two fns for getting notes from DB with paginator
const getQueryFromServer = (snapshot, initArr) => {
  const counter = $counter.getState(); //counter get events from mousewheel -increment for up and decrement for down
  //calculate first visible doc on the page
  let firstVisible =
     counter <= snapshot.docs.length  
      ? snapshot.docs[snapshot.docs.length - counter]  
      : snapshot.docs[0] && increment(-1) //decrement counter
  return getDocRef()
    .orderBy("noteNumber", "asc")
    .startAt(firstVisible) // start query from first visivble doc
    .limit(NOTES_PER_PAGE)  
    .get()
    .then(snapshot =>
      snapshot.forEach(doc =>
        pushDocIntoArray(
          initArr,
          doc.data(),
          doc.data().noteNumber,
          doc.id
        )
      )
    )    };

const getArrFromFirebase = initArr => {
  return getDocRef()
    .orderBy("noteNumber", "asc")
    .get()
    .then(snapshot => getQueryFromServer(snapshot, initArr))
    .then(() => initArr)
    .catch(err => console.log(err));
};

// Events
export const getInputText = createEvent();
export const updateNoteUnderEdition = createEvent();
export const openModalAlert = createEvent();
export const setModalAlertContent = createEvent();
export const openModalAuth = createEvent();
export const openModalLost = createEvent();
export const editNote = createEvent();
export const onCancel = createEvent();
export const onRefresh = createEvent();
//Effects for handeling server data
export const addNote = createEffect("add note").use(obj =>
  getDocRef()
    .doc()
    .set(obj)
    .catch(err => console.error("Error writing document", err))
);
export const getNotes = createEffect("get notes").use(() =>
  getArrFromFirebase(notes())
    .then(res => (res ? res : []))
    .catch(err => console.error("Error getting document", err))
);

export const deleteNote = createEffect("delete note").use(id =>
  getDocRef()
    .doc(id)
    .delete()
    .catch(err => console.error("Error deleting document", err))
);
// Stores
export const $biggerNoteNumber = createStore(0).on(
  getNotes.done,
  (state, { result }) => Math.max(...result.map(e => e["noteNumber"]))
);

export const $input = createStore("")
  .on(getInputText, (state, msg) => msg)
  .on(editNote, (state, noteObj) => noteObj.note)
  .reset(addNote)
  .reset(onCancel);

export const $notes = createStore([])
  .on(getNotes.done, (state, { result }) => result || [])
  .on(addNote.done, (state, { result }) => state)
  .on(editNote, (state, noteObj) =>
    state.filter(item => item.id !== noteObj.id)
  )
  .reset(onRefresh);

export const $noteUnderEdition = createStore({
  noteUnderEdit: false,
  noteUnderEditText: ""
})
  .on(
    updateNoteUnderEdition,
    (oldState, { noteUnderEdit, noteUnderEditText, noteUnderEditId }) => ({
      ...oldState,
      noteUnderEdit,
      noteUnderEditText,
      noteUnderEditId
    })
  )
  .reset(deleteNote)
  .reset(onCancel);

export const $preloader = createStore({ loading: true })
  .on(getNotes.done, (store, params) => ({ ...store, loading: false }))
  .reset(getNotes);

export const $modals = createStore({
  isShowModalAlert: false,
  isShowModalAuth: false,
  isShowLostModal: false,
  modalContent: ""
})
  .on(openModalAlert, (oldState, isShowModalAlert) => ({
    ...oldState,
    isShowModalAlert
  }))
  .on(setModalAlertContent, (oldState, modalContent) => ({
    ...oldState,
    modalContent
  }))
  .on(openModalLost, (oldState, isShowLostModal) => ({
    ...oldState,
    isShowLostModal
  }))
  .on(openModalAuth, (oldState, isShowModalAuth) => ({
    ...oldState,
    isShowModalAuth
  }));  

//Watchers
//getNotes.fail.watch(console.log);
//getNotes.done.watch(console.log);
addNote.done.watch(getNotes);
deleteNote.done.watch(getNotes);
onCancel.watch(getNotes);
$counter.watch(getNotes)

$modals.watch(console.log)


