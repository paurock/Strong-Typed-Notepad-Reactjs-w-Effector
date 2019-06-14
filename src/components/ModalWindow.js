import React from "react";
import ReactModal from "react-modal";
import { openModalAlert, setModalAlertContent } from "../model";
import PropTypes from "prop-types";
import "../stylesheets/modalWindow.css";

ReactModal.setAppElement("#root");

export const alertModal = contentModal => {
  setModalAlertContent(contentModal);
  openModalAlert(true);
  return new Promise(resolve =>
    setTimeout(() => resolve(openModalAlert(false)), 2000)
  );
};

export const ModalWindow = ({
  showModal = false,
  modalContent = "Modal Text",
  closeModal = f => f,
  closeBtn = true
}) => (
  <ReactModal isOpen={showModal} contentLabel="Alert" closeTimeoutMS={500}>
    <div className="modalWindow">
      <div>{modalContent}</div>
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
