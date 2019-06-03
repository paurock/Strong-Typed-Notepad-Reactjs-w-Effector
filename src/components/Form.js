import React from "react";
import { useStore } from "effector-react";
import {
  $input,
  addNote,
  $techVars,
  getInputText,
  openModal,
  deleteNote,
  onCancel
} from "../model";
import PropTypes from "prop-types";
import { Input, Button } from "antd";
import { ModalWindow } from "./ModalWindow";

const { TextArea } = Input;

export const AddNoteForm = ({ name }) => {
  const input = useStore($input);
  const { noteUnderEdit, noteUnderEditId, showModal } = useStore($techVars);

  const handleChange = e => getInputText(e.target.value);

  const handleSubmit = e => {
    e.preventDefault();
    if (input !== "") {
      addNote({ note: input, category: name });
      noteUnderEditId && deleteNote(noteUnderEditId);
    } else {
      openModal(true);
    }
  };

  return (
    <>
      <FormItem
        input={input}
        noteUnderEdit={noteUnderEdit}
        handleSubmit={e => handleSubmit(e)}
        handleChange={e => handleChange(e)}
      />
      <ModalWindow
        showModal={showModal}
        contentModal="Try to add something please!"
      />
    </>
  );
};
AddNoteForm.propTypes = {
  name: PropTypes.string
};

const FormItem = ({
  input,
  handleSubmit = f => f,
  handleChange = f => f,
  noteUnderEdit
}) => (
  <div className="form">
    <form onSubmit={handleSubmit}>
      <TextArea
        rows={6}
        value={input}
        onKeyDown={e => e.keyCode === 13 && e.ctrlKey && handleSubmit(e)}
        onChange={e => handleChange(e)}
      />
      <div className="note-buttons">
        <Button type="primary" onClick={handleSubmit} block>
          {noteUnderEdit ? "Save" : "Add"}
        </Button>
        {noteUnderEdit && (
          <>
            <Button onClick={() => onCancel()} block>
              Cancel
            </Button>
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
