import { createStore, createEvent, createEffect } from "effector";
import firebase from "./configFB";
import "firebase/auth";

export const auth = firebase.auth();
//DB
const db = firebase.firestore();
//Notes
const notes = () => [];

const pushDocIntoArray = (arr, obj, noteNumber, id) =>
  arr.push({ ...obj, noteNumber, id });

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

//Effects for handeling server data
export const addNote = createEffect("add note").use(obj =>
  getDocRef()
    .doc()
    .set(obj)
    .catch(err => console.error("Error writing document", err))
);
export const getNotes = createEffect("get notes").use(() =>
  getArrFromFirebase(notes()).then(res => (res ? res : []))
);
export const deleteNote = createEffect("delete note").use(id =>
  getDocRef()
    .doc(id)
    .delete()
);

// Events
export const getInputText = createEvent();
export const updateNoteUnderEdition = createEvent();
export const openModalEmptyField = createEvent();
export const openModalAuth = createEvent();
export const editNote = createEvent();
export const onCancel = createEvent();
export const onRefresh = createEvent();

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
  showModalEmptyInput: false,
  isShowModalAuth: false
})
  .on(openModalEmptyField, (oldState, showModalEmptyInput) => ({
    ...oldState,
    showModalEmptyInput
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
//$modals.watch(user);
