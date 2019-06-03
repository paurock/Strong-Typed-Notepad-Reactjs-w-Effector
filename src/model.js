import { createStore, createEvent, createEffect } from "effector";
import firebase from "./configFB";

const db = firebase.firestore();

const notes = () => [];
const pushDocIntoArray = (arr, obj, id) => arr.push({ ...obj, id });

//Reading Data from Firebase
const getArrFromFirebase = (initArr, collectionName) =>
  db
    .collection(collectionName)
    .get()
    .then(snapshot =>
      snapshot.forEach(doc => pushDocIntoArray(initArr, doc.data(), doc.id))
    )
    .then(() => initArr)
    .catch(err => console.log(err));

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

// notesFB.then(res=>console.log(res))
export const getInputText = createEvent();
export const updateTechVars = createEvent();
export const openModal = createEvent();
export const editNote = createEvent();
export const onCancel = createEvent();

export const $input = createStore("")
  .on(getInputText, (state, msg) => msg)
  .on(editNote, (state, noteObj) => noteObj.note)
  .reset(addNote)
  .reset(onCancel);

export const $notes = createStore([])
  .on(getNotes.done, (state, { result }) => result)
  .on(addNote.done, (state, { result }) => state);

export const $techVars = createStore({
  noteUnderEdit: false,
  noteUnderEditText: "",
  showModal: false,
  loader: true
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

getNotes.fail.watch(console.log);
getNotes.done.watch(console.log);
addNote.done.watch(getNotes);
deleteNote.done.watch(getNotes);
