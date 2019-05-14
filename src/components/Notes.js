import React from "react";
import { useStore } from "effector-react";
import { v4 } from "uuid";
import {
  $input,
  $notes,
  addNote,
  $techVars,
  updateTechVars,
  onRemove,
  editNote,
  getInputText,
  openModal
} from "../model";
import PropTypes from "prop-types";
import { Input, Button } from "antd";
import { Ddmmyyyy } from "./Ddmmyyyy";
import { ModalWindow } from "./ModalWindow";

const { TextArea } = Input;

export const AddNoteForm = ({ name }) => {
  const input = useStore($input);
  const { noteUnderEdit, noteUnderEditText, showModal } = useStore($techVars);
  const handleChange = e => getInputText(e.target.value);
  const handleSubmit = e => {
    e.preventDefault();
    input !== ""
      ? addNote({ note: input, id: v4(), category: name })
      : openModal(true);
  };
  const onCancel = () => {
    addNote({ note: noteUnderEditText, id: v4(), category: name });
  };
  return (
    <>
      <FormItem
        input={input}
        noteUnderEdit={noteUnderEdit}
        onCancel={onCancel}
        handleSubmit={e => handleSubmit(e)}
        handleChange={e => handleChange(e)}
      />
      <ModalWindow showModal={showModal} />
    </>
  );
};

const FormItem = ({
  input,
  handleSubmit = f => f,
  handleChange = f => f,
  noteUnderEdit,
  onCancel = f => f
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
            <Button onClick={onCancel} block>
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
  noteUnderEdit: PropTypes.bool
};

export const NoteList = ({ name }) => {
  const notesAll = useStore($notes);
  const filteredNotes = notesAll.filter(noteObj => noteObj.category === name);
  const handleEditNote = noteObj => {
    updateTechVars({ noteUnderEdit: true, noteUnderEditText: noteObj.note });
    editNote(noteObj);
  };

  return (
    <>
      {filteredNotes.length !== 0 ? (
        filteredNotes.map(noteObj => (
          <div className="note" key={v4()}>
            <span className="timestamp">
              <Ddmmyyyy />{" "}
            </span>
            <span
              className="close"
              key={v4()}
              onClick={() => onRemove(noteObj.id)}
            >
              x
            </span>
            <div
              className="note-text"
              key={v4()}
              onClick={() => handleEditNote(noteObj)}
            >
              {noteObj.note}
            </div>
          </div>
        ))
      ) : (
        <p>Please add a note!</p>
      )}
    </>
  );
};
NoteList.propTypes = {
  notesAll: PropTypes.array,
  filteredNotes: PropTypes.array,
  name: PropTypes.string,
  updateTechVars: PropTypes.func,
  editNote: PropTypes.func,
  handleEditNote: PropTypes.func,
  onRemove: PropTypes.func
};
