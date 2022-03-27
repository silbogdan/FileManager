import React from "react";
import "../styles/Modal.css";

export const Modal = ({ itemName, itemType, setShowModal }) => {
  return (
    <div className="modal-box">
      <h1>{itemName}</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <button>Download</button>
        <button>Delete</button>
        <button onClick={() => setShowModal(false)}>Close</button>
      </div>
    </div>
  );
};
