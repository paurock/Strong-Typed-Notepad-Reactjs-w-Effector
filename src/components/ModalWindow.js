import React from "react";
import ReactModal from "react-modal";
import { openModal } from "../model";

ReactModal.setAppElement("#root");

export const ModalWindow = ({ showModal }) => (
  <ReactModal isOpen={showModal} contentLabel="Alert">
    <div className="modalWindow">
      <p>Please enter some text!</p>
      <button onClick={() => openModal(false)}>Close</button>
    </div>
  </ReactModal>
);
