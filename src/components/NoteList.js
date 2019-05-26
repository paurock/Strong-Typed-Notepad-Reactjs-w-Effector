import React from "react";
import { useStore } from "effector-react";
import { v4 } from "uuid";
import PropTypes from "prop-types";
import { $notes, updateTechVars, onRemove, editNote } from "../model";
import { Ddmmyyyy } from "./Ddmmyyyy";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "../stylesheets/transitionGroup.css";

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
        <TransitionGroup>
          {filteredNotes.map(item => (
            <CSSTransition key={item.id} timeout={500} classNames="item">
              <div className="note" key={v4()}>
                <span className="timestamp">
                  <Ddmmyyyy />
                </span>
                <span
                  className="close"
                  key={v4()}
                  onClick={() => onRemove(item.id)}
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
  filteredNotes: PropTypes.array,
  name: PropTypes.string,
  updateTechVars: PropTypes.func,
  editNote: PropTypes.func,
  handleEditNote: PropTypes.func,
  onRemove: PropTypes.func
};
