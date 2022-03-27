import React, { useState } from "react";
import "../styles/FilesTable.css";
import { FileIcon } from "../assets/FileIcon";
import { DirIcon } from "../assets/DirIcon";

export const FilesTable = ({
  setSelectedItem,
  setShowModal,
  files,
  directories,
}) => {
  function enableModal(e, item) {
    e.preventDefault();
    setShowModal(true);
    setSelectedItem(item);
  }

  return (
    <>
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
            <tr
              style={{ cursor: "pointer" }}
              onClick={(e) => enableModal(e, { name: file.name, type: "file" })}
            >
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
            <tr
              style={{ cursor: "pointer" }}
              onClick={(e) => enableModal(e, { name: dir, type: "dir" })}
            >
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
