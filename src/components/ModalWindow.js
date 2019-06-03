import React from "react";
import ReactModal from "react-modal";
import { openModal } from "../model";
import PropTypes from "prop-types";
import "../stylesheets/modalWindow.css";

ReactModal.setAppElement("#root");

export const ModalWindow = ({ showModal, contentModal, closeBtn = true }) => (
  <ReactModal isOpen={showModal} contentLabel="Alert" closeTimeoutMS={500}>
    <div className="modalWindow">
      <p>{contentModal}</p>
      {closeBtn && <button onClick={() => openModal(false)}>Close</button>}
    </div>
  </ReactModal>
);

ModalWindow.propTypes = {
  showModal: PropTypes.bool,
  contentModal: PropTypes.string,
  closeBtn: PropTypes.bool
};
