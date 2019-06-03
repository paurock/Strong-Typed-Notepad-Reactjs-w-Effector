/* ///Local Storage///
const readLS = () => localStorage.getItem("effector-notes"); //Fn that read data with your label from LS
const writeLS = newItem =>
  localStorage.setItem("effector-notes", JSON.stringify(newItem)); //Fn that write your object in LS
const notesLS = readLS();
const initialState = data => (data !== null ? data : "[]"); */
