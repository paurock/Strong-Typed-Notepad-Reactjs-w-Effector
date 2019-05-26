import React from "react";
import { useStore } from "effector-react";
import PropTypes from "prop-types";
import { v4 } from "uuid";
import { $notes, updateTechVars, onRemove, editNote } from "../model";
import { Ddmmyyyy } from "./Ddmmyyyy";
import { useTransition, animated } from "react-spring";

export const NoteList = ({ name }) => {
  const notesAll = useStore($notes);
  const filteredNotes = notesAll.filter(noteObj => noteObj.category === name);

  const handleEditNote = noteObj => {
    updateTechVars({ noteUnderEdit: true, noteUnderEditText: noteObj.note });
    editNote(noteObj);
  };
  const transitions = useTransition(filteredNotes, item => item.id, {
    from: { opacity: 0 },
    config: { duration: 200 },
    enter: { opacity: 1 },
    leave: { opacity: 0 }
  });

  console.log(transitions);

  return (
    <>
      {filteredNotes.length !== 0 ? (
        transitions.map(({ item, key, props }) => (
          <animated.div className="note" key={v4()} style={props}>
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
          </animated.div>
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
