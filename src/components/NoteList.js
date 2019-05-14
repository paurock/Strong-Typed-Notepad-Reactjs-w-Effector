import React from "react";
import { useStore } from "effector-react";
import PropTypes from "prop-types";
import { v4 } from "uuid";
import { $notes, updateTechVars, onRemove, editNote } from "../model";
import { Ddmmyyyy } from "./Ddmmyyyy";

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
