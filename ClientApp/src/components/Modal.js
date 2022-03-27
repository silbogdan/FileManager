import React from "react";
import "../styles/Modal.css";
import axios from 'axios';
import jwt_decode from 'jwt-decode';

export const Modal = ({ itemName, itemType, setShowModal, curServer }) => {
  const token = localStorage.getItem('token');

  async function downloadFile(e) {
    e.preventDefault;

    var data = JSON.stringify({
      "command": "download",
      "req": {
        "path": "/home/adminfhost/uploaded-file",
      },
      "host": curServer
    });

    var config = {
      method: 'post',
      url: '/FileManager/ExecuteCommand',
      headers: { 
        'Authorization': `Bearer ${token}`, 
        'Content-Type': 'application/json'
      },
      data : data
    };

    const response = await axios(config);
    window.location.href = 'data:application/octet-stream;base64,' + response.data;
  }

  return (
    <div className="modal-box">
      <h1>{itemName}</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <button onClick={(e) => downloadFile(e)}>Download</button>
        <button>Delete</button>
        <button onClick={() => setShowModal(false)}>Close</button>
      </div>
    </div>
  );
};
