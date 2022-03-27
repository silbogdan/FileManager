import React, { useState } from "react";
import "../styles/FilesTable.css";
import { FileIcon } from "../assets/FileIcon";
import { DirIcon } from "../assets/DirIcon";
import { Modal } from "./Modal";

export const FilesTable = ({ files, directories }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {showModal ? <Modal /> : <></>}
      <table className="table-stretch">
        <thead>
          <tr>
            <th>Type</th>
            <th>Name</th>
            <th>File size</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file) => (
            <tr style={{ cursor: "pointer" }}>
              <td>
                <div style={{ width: "30px", heigh: "30px" }}>
                  <FileIcon />
                </div>
              </td>
              <td>{file.name}</td>
              <td>{file.size} GB</td>
            </tr>
          ))}
          {directories.map((dir) => (
            <tr style={{ cursor: "pointer" }}>
              <td>
                <div style={{ width: "30px", heigh: "30px" }}>
                  <DirIcon />
                </div>
              </td>
              <td>{dir}</td>
              <td> - </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
