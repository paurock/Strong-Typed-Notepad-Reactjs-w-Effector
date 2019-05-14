import React from "react";
import ReactModal from "react-modal";
import { openModal } from "../model";
import PropTypes from "prop-types";

ReactModal.setAppElement("#root");

export const ModalWindow = ({ showModal }) => (
  <ReactModal isOpen={showModal} contentLabel="Alert">
    <div className="modalWindow">
      <p>Please enter some text!</p>
      <button onClick={() => openModal(false)}>Close</button>
    </div>
  </ReactModal>
);

ModalWindow.propTypes = {
  notesAll: PropTypes.bool
};
