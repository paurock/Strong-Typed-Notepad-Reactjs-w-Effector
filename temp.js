.on(editNote, (oldState, { result }) => [
  ...oldState.filter(note => note.id !== result.id)
])
.on(addNote.done, (state, { result }) => [
  ...state.filter(item => item.note !== result.note),
  result
])
.on(deleteNote.done, (state, { id }) => [
  ...state.filter(item => item.id !== id)
]);
  
  
  
  
  .on(deleteNote.done, (oldState, id) => [
    ...oldState.filter(item => item.id !== id)
  ]);
  .on(saveNote.done, (oldState, noteObj) => [
    ...oldState.filter(item => item.note !== noteObj.note),
    noteObj
  ])

  .then(res => console.log(JSON.parse(res)))
  .catch(err => console.log(err));

/* ///Local Storage///
const readLS = () => localStorage.getItem("effector-notes"); //Fn that read data with your label from LS
const writeLS = newItem =>
  localStorage.setItem("effector-notes", JSON.stringify(newItem)); //Fn that write your object in LS
const notesLS = readLS();
const initialState = data => (data !== null ? data : "[]"); */