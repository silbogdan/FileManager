import React, { useState } from "react";
import "../styles/Modal.css";
import axios from 'axios';
import jwt_decode from 'jwt-decode';

export const CreateModal = ({ setCreateModal, pwd, curServer }) => {
  const token = localStorage.getItem('token');

  const [itemType, setItemType] = useState('none');
  const [fileName, setFileName] = useState('');

  async function createItem() {
      if (fileName && itemType != 'none') {
        var data = JSON.stringify({
            "command": "create",
            "req": {
              "path": `${pwd}/${fileName}`,
              "type": itemType.toLowerCase()
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
          
          await axios(config);
      } else {
          console.log('Error');
      }
  }

  return (
    <div className="modal-box">
      <h1>Create new item</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <input type="text" placeholder="File name" onChange={(e) => setFileName(e.target.value)}></input>
        <div onChange={(e) => setItemType(e.target.value)}>
            <input type="radio" id="file-check" name="type-check" value="FILE"></input>
            <label htmlFor="file-check" style={{ marginRight: '15px' }}>File</label>
            <input type="radio" id="dir-check" name="type-check" value="DIR"></input>
            <label htmlFor="dir-check">Directory</label>
        </div>
        <button onClick={createItem}>Create</button>
        <button onClick={() => setCreateModal(false)}>Cancel</button>
      </div>
    </div>
  );
};
