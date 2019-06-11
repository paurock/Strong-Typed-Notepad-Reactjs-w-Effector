import React from "react";
import { useStore } from "effector-react";
import {
  $input,
  $modals,
  $preloader,
  $biggerNoteNumber,
  addNote,
  $noteUnderEdition,
  getInputText,
  openModalEmptyField,
  deleteNote,
  onCancel
} from "../model";
import PropTypes from "prop-types";
import { ModalWindow } from "./ModalWindow";
import { auth } from "../model";

// Form component Parent //

export const AddNoteForm = ({ name }) => {
  const user = auth.currentUser;
  const input = useStore($input);
  const biggerNoteNumber = useStore($biggerNoteNumber);
  const { loading } = useStore($preloader);
  const { noteUnderEdit, noteUnderEditId } = useStore($noteUnderEdition);
  const { showModalEmptyInput } = useStore($modals);

  //submit a note
  const handleSubmit = e => {
    e.preventDefault();
    if (input !== "") {
      //delete a note if it's under edition
      noteUnderEditId && deleteNote(noteUnderEditId);
      //add a note
      addNote({
        note: input,
        category: name,
        noteNumber: biggerNoteNumber === -Infinity ? 0 : biggerNoteNumber + 1
      });
    } else {
      //Alert to fill textarea if empty
      openModalEmptyField(true);
    }
  };

  return (
    user && (
      <>
        <FormItem
          input={input}
          noteUnderEdit={noteUnderEdit}
          handleSubmit={e => handleSubmit(e)}
          handleChange={e => handleChange(e)}
        />
        <ModalWindow
          showModal={showModalEmptyInput}
          contentModal="Try to add something please!"
          closeModal={openModalEmptyField}
        />
        <ModalWindow
          showModal={loading}
          contentModal="Please wait..."
          closeBtn={false}
        />
      </>
    )
  );
};
AddNoteForm.propTypes = {
  name: PropTypes.string.isRequired
};

// Form component Child
const FormItem = ({ input, handleSubmit = f => f, noteUnderEdit }) => (
  <div className="form">
    <form onSubmit={handleSubmit}>
      <textarea
        rows={6}
        value={input}
        onKeyDown={e => e.keyCode === 13 && e.ctrlKey && handleSubmit(e)}
        onChange={e => getInputText(e.target.value)}
      />
      <div className="note-buttons">
        <button onClick={handleSubmit}>{noteUnderEdit ? "Save" : "Add"}</button>
        {noteUnderEdit && (
          <>
            <button onClick={() => onCancel()}>Cancel</button>
          </>
        )}
      </div>
    </form>
  </div>
);
FormItem.propTypes = {
  input: PropTypes.string,
  handleSubmit: PropTypes.func,
  handleChange: PropTypes.func,
  onCancel: PropTypes.func,
  onSave: PropTypes.func,
  noteUnderEdit: PropTypes.bool
};
