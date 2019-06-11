import React from "react";
import ReactModal from "react-modal";
import PropTypes from "prop-types";
import "../stylesheets/modalWindow.css";

ReactModal.setAppElement("#root");

export const ModalWindow = ({
  showModal = false,
  contentModal = "Modal Text",
  closeModal = f => f,
  closeBtn = true
}) => (
  <ReactModal isOpen={showModal} contentLabel="Alert" closeTimeoutMS={500}>
    <div className="modalWindow">
      <div>{contentModal}</div>
      {closeBtn && (
        <button className="closeModal" onClick={() => closeModal(false)}>
          Close
        </button>
      )}
    </div>
  </ReactModal>
);

ModalWindow.propTypes = {
  showModal: PropTypes.bool,
  contentModal: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  closeBtn: PropTypes.bool,
  closeModal: PropTypes.func
};
