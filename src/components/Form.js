import React from "react";
import { useStore } from "effector-react";
import { v4 } from "uuid";
import { $input, addNote, $techVars, getInputText, openModal } from "../model";
import PropTypes from "prop-types";
import { Input, Button } from "antd";
import { ModalWindow } from "./ModalWindow";
import { CSSTransition } from "react-transition-group";
import "../stylesheets/transition.css";
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
      <CSSTransition
        in={showModal}
        unmountOnExit
        timeout={1000}
        classNames="modalWindow"
      >
        <ModalWindow showModal={showModal} />
      </CSSTransition>
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
