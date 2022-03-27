import React, { useState } from "react";
import "../styles/FilesTable.css";
import { FileIcon } from "../assets/FileIcon";
import { DirIcon } from "../assets/DirIcon";
import axios from "axios";

export const FilesTable = ({
  setSelectedItem,
  setShowModal,
  files,
  directories,
  setPwd,
  setFiles,
  setDirectories,
  pwd,
  curServer
}) => {
  function enableModal(e, item) {
    e.preventDefault();
    setShowModal(true);
    setSelectedItem(item);
  }

  async function goToDirectory(e, dir) {
    e.preventDefault();
    console.log("Go to " + dir + " for " + curServer);
    var data = JSON.stringify({
      "command": "get-items",
      "req": {
        "path": dir,
      },
      "host": curServer
    });

    const token = localStorage.getItem('token');
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
    console.log('Setting pwd to ' + dir);
    setPwd(dir);
    console.log('Setting files to smth');
    setFiles(response.data.Files);
    console.log('Setting directories to smth');
    setDirectories(response.data.Directories);
  }

  async function goBack(e) {
    e.preventDefault();
    
    let path = pwd.split('/');
    path.pop();
    if (path == "") {
      path = "/";
    } else {
      path = path.join('/');
    }
    console.log('PWD: ' +  pwd);
    console.log('Path: ' + path);

    

    await goToDirectory(e, path);
  }

  return (
    <>
      <table className="table-stretch">
        <thead>
          <tr>
            <th>Type</th>
            <th>Name</th>
            <th>File size</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file) => (
            <tr
              style={{ cursor: "pointer" }}
            >
              <div onClick={(e) => goToDirectory(e, dir)}>
                <td>
                  <div style={{ width: "30px", heigh: "30px" }}>
                    <FileIcon />
                  </div>
                </td>
                <td>{file.Name.split('/').pop()}</td>
                <td>{file.Size} GB</td>
              </div>
              <td>
                <button onClick={(e) => enableModal(e, { name: file, type: "file" })}>Edit</button>
              </td>
            </tr>
          ))}
          {directories.map((dir) => (
            <tr
              style={{ cursor: "pointer" }}
            >
              <div onClick={(e) => goToDirectory(e, dir)}>
                <td>
                  <div style={{ width: "30px", heigh: "30px" }}>
                    <DirIcon />
                  </div>
                </td>
                <td>{dir.split('/').pop()}</td>
                <td> - </td>
              </div>
              <td>
                <button onClick={(e) => enableModal(e, { name: dir, type: "dir" })}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {
        pwd != "/" ? <button onClick={(e) => goBack(e)} style={{ marginTop: "15px" }}>Back</button> : <></>
      }
      
    </>
  );
};
