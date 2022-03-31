import React from "react";
import "../styles/Modal.css";
import axios from 'axios';
import jwt_decode from 'jwt-decode';

export const Modal = ({ itemName, itemType, setShowModal, curServer, pwd, setPwd }) => {
  const token = localStorage.getItem('token');

  async function downloadFile(e) {
    e.preventDefault;

    if (itemType === 'file') {
      var data = JSON.stringify({
        "command": "download",
        "req": {
          "path": itemName,
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
      console.log(response.data);
      const link = 'data:application/octet-stream;base64,' + response.data;
      const downloader = document.createElement('a');
      downloader.href = link;
      downloader.download = itemName.split('/').pop();
      downloader.click();
      setShowModal(false);
    }
  }

  async function deleteFile(e) {
    e.preventDefault();

    if (itemType === 'file') {
      var data = JSON.stringify({
        "command": "delete",
        "req": {
          "path": itemName,
        },
        "host":curServer
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

      await axios(config);
      setShowModal(false);
    }
  }

  return (
    <div className="modal-box">
      <h1>{itemName}</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <button>Rename</button>
        { itemType === 'file' ? (
          <>
            <button onClick={(e) => downloadFile(e)}>Download</button>
            <button onClick={(e) => deleteFile(e)}>Delete</button>
          </>
        ) : <></> }
        <button onClick={() => setShowModal(false)}>Close</button>
      </div>
    </div>
  );
};
