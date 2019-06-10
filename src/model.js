import { createStore, createEvent, createEffect } from "effector";
import firebase from "./configFB";
import "firebase/auth";
//Auth
const auth = firebase.auth();
//DB
const db = firebase.firestore();
//Notes 
const notes = () => [];

const pushDocIntoArray = (arr, obj, id, noteNumber) =>
  arr.push({ ...obj, id, noteNumber });

//Reading Data from Firebase server//

const getArrFromFirebase = (initArr, collectionName) =>
  db
    .collection(collectionName)
    .orderBy("noteNumber", "asc")
    .get()
    .then(snapshot =>
      snapshot.forEach(doc =>
        pushDocIntoArray(initArr, doc.data(), doc.id, doc.data().noteNumber)
      )
    )
    .then(() => initArr)
    .catch(err => console.log(err));
//Effects for handeling server data
export const getNotes = createEffect("get notes").use(() =>
  getArrFromFirebase(notes(), "$notes").then(res => res)
);
export const addNote = createEffect("add note").use(obj =>
  db
    .collection("$notes")
    .add(obj)
    .catch(err => console.log(err))
);
export const deleteNote = createEffect("delete note").use(id =>
  db
    .collection("$notes")
    .doc(id)
    .delete()
);

// Events
export const getInputText = createEvent();
export const updateTechVars = createEvent();
export const openModal = createEvent();
export const editNote = createEvent();
export const onCancel = createEvent();

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
  .on(getNotes.done, (state, { result }) => result)
  .on(addNote.done, (state, { result }) => state)
  .on(editNote, (state, noteObj) =>
    state.filter(item => item.id !== noteObj.id)
  );

export const $techVars = createStore({
  noteUnderEdit: false,
  noteUnderEditText: "",
  showModal: false
})
  .on(
    updateTechVars,
    (oldState, { noteUnderEdit, noteUnderEditText, noteUnderEditId }) => ({
      ...oldState,
      noteUnderEdit,
      noteUnderEditText,
      noteUnderEditId
    })
  )
  .on(openModal, (oldState, showModal) => ({ ...oldState, showModal }))
  .reset(deleteNote)
  .reset(onCancel);

export const $preloader = createStore({ loading: true })
  .on(getNotes.done, (store, params) => ({ ...store, loading: false }))
  .reset(getNotes);

export const $modals = createStore({})



//Watchers

//getNotes.fail.watch(console.log);
//getNotes.done.watch(console.log);
addNote.done.watch(getNotes);
deleteNote.done.watch(getNotes);
onCancel.watch(getNotes);
