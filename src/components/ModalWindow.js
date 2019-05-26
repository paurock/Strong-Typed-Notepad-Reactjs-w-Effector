import React from "react";
import ReactModal from "react-modal";
import { openModal } from "../model";
import PropTypes from "prop-types";
import "../stylesheets/modalWindow.css";

ReactModal.setAppElement("#root");

export const ModalWindow = ({ showModal }) => (
  <ReactModal isOpen={showModal} contentLabel="Alert" closeTimeoutMS={500}>
    <div className="modalWindow">
      <p>Please enter some text!</p>
      <button onClick={() => openModal(false)}>Close</button>
    </div>
  </ReactModal>
);

ModalWindow.propTypes = {
  showModal: PropTypes.bool
};
