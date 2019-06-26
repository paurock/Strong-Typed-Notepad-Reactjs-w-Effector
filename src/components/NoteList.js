import React, { useEffect } from "react";
import { useStore } from "effector-react";
import { v4 } from "uuid";
import PropTypes from "prop-types";
import {
  $notes,
  updateNoteUnderEdition,
  deleteNote,
  editNote,
  getNotes,
  onRefresh
} from "../model/model";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "../stylesheets/transitionGroup.css";
import { auth } from "../model/model";

// Note list Component
export const NoteList = ({ name }) => {
  const notesAll = useStore($notes);
  const user = auth.currentUser;

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      getNotes();
      onRefresh();
    });
  }, []);

  const filteredNotesByCategory = notesAll.filter(
    noteObj => noteObj.category === name
  );

  const handleEditNote = noteObj => {
    updateNoteUnderEdition({
      noteUnderEdit: true,
      noteUnderEditText: noteObj.note,
      noteUnderEditId: noteObj.id
    });
    editNote(noteObj);
  };

  return user ? (
    <>
      {filteredNotesByCategory.length !== 0 ? (
        <TransitionGroup>
          {filteredNotesByCategory.map(item => (
            <CSSTransition key={item.id} timeout={500} classNames="item">
              <div className="note" key={v4()}>
                <time className="timestamp">{item.timestamp}</time>
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
  ) : (
    <p>Please sign in or sign up to add and read notes!</p>
  );
};
NoteList.propTypes = {
  notesAll: PropTypes.array,
  filteredNotesByCategory: PropTypes.array,
  name: PropTypes.string.isRequired,
  updateNoteUnderEdition: PropTypes.func,
  editNote: PropTypes.func,
  handleEditNote: PropTypes.func,
  onRemove: PropTypes.func
};
