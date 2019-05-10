import { createStore, createEvent } from 'effector';

///Local Storage///
 
const readLS = () => localStorage.getItem("effector-notes") //Fn that read data with your label from LS 
const writeLS = (newItem) => localStorage.setItem("effector-notes", JSON.stringify(newItem)) //Fn that write your object in LS
const dataLS = readLS()
const initialState = () => JSON.parse((dataLS!==null) ? dataLS : '[]' ) 

export const getInputText = createEvent()
export const addNote = createEvent()
export const editNote = createEvent()
export const updateTechVars = createEvent() 
export const onRemove = createEvent()
///Effector store
export const $input = createStore("")
    .on(getInputText, (state, msg) => msg) 
    .on(editNote, (state, noteObj) => noteObj.note)
    .reset(addNote)
export const $notes = createStore(initialState())    
    .on(editNote, (oldState, noteObj) => [...oldState.filter(note=>note.id!==noteObj.id)] )
    .on(addNote, (oldState, noteObj) => [...oldState.filter(item=>item.note!==noteObj.note), noteObj])
    .on(onRemove, (oldState, id) => [...oldState.filter(item=>item.id!==id)] )

export const $techVars =  createStore({noteUnderEdit: false})
    .on(updateTechVars, (oldState, techObj) => techObj )
    .reset(addNote)    
    .reset(onRemove)
    

$notes.watch(writeLS)

//localStorage.clear()