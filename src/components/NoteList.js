import React, { useEffect } from "react";
import { useStore } from "effector-react";
import { v4 } from "uuid";
import PropTypes from "prop-types";
import {
  $notes,
  updateTechVars,
  deleteNote,
  editNote,
  getNotes
} from "../model";
import { Ddmmyyyy } from "./Ddmmyyyy";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "../stylesheets/transitionGroup.css";

// Note list Component
export const NoteList = ({ name }) => {
  const notesAll = useStore($notes);
  useEffect(() => {
    getNotes();
  }, []);

  const filteredNotesByCategory = notesAll.filter(
    noteObj => noteObj.category === name
  );

  const handleEditNote = noteObj => {
    updateTechVars({
      noteUnderEdit: true,
      noteUnderEditText: noteObj.note,
      noteUnderEditId: noteObj.id
    });
    editNote(noteObj);
  };

  return (
    <>
      {filteredNotesByCategory.length !== 0 ? (
        <TransitionGroup>
          {filteredNotesByCategory.map(item => (
            <CSSTransition key={item.id} timeout={500} classNames="item">
              <div className="note" key={v4()}>
                <span className="timestamp">
                  <Ddmmyyyy />
                </span>
                <span
                  className="close"
                  key={v4()}
                  onClick={id => deleteNote(item.id)}
                >
                  x
                </span>
                <div
                  className="note-text"
                  key={v4()}
                  onClick={() => handleEditNote(item)}
                >
                  {item.note}
                </div>
              </div>
            </CSSTransition>
          ))}
        </TransitionGroup>
      ) : (
        <p>Please add a note!</p>
      )}
    </>
  );
};
NoteList.propTypes = {
  notesAll: PropTypes.array,
  filteredNotesByCategory: PropTypes.array,
  name: PropTypes.string,
  updateTechVars: PropTypes.func,
  editNote: PropTypes.func,
  handleEditNote: PropTypes.func,
  onRemove: PropTypes.func
};
