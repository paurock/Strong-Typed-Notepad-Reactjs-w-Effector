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
  openModalAlert,
  deleteNote,
  onCancel
} from "../model/model";
import PropTypes from "prop-types";
import { Ddmmyyyy } from "./Ddmmyyyy";
import { ModalWindow } from "./ModalWindow";
import { auth } from "../model/model";

// Form component Parent //

export const AddNoteForm = ({ name }) => {
  const user = auth.currentUser;
  const input = useStore($input);
  const biggerNoteNumber = useStore($biggerNoteNumber);
  const { loading } = useStore($preloader);
  const { noteUnderEdit, noteUnderEditId } = useStore($noteUnderEdition);
  const { isShowModalAlert } = useStore($modals);
  console.log(isShowModalAlert);
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
        noteNumber: biggerNoteNumber === -Infinity ? 0 : biggerNoteNumber + 1,
        timestamp: Ddmmyyyy()
      });
    } else {
      //Alert to fill textarea if empty
      openModalAlert(true);
    }
  };

  return (
    user && (
      <>
        <FormItem
          input={input}
          noteUnderEdit={noteUnderEdit}
          handleSubmit={e => handleSubmit(e)}
        />
        <ModalWindow
          showModal={isShowModalAlert}
          modalContent="Try to add something please!"
          closeModal={openModalAlert}
        />
        <ModalWindow
          showModal={loading}
          modalContent="Please wait..."
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
