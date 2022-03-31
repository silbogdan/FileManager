import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import "../styles/Files.css";
import { DirIcon } from "../assets/DirIcon";
import { FileIcon } from "../assets/FileIcon";
import { NavBar } from "../components/NavBar";
import { FilesTable } from "../components/FilesTable";
import { Modal } from "../components/Modal";
import { CreateModal } from "../components/CreateModal";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { Create } from "../assets/Create";
import { Upload } from "../assets/Upload";

export const Files = () => {
  const token = localStorage.getItem("token");
  const decodedToken = jwt_decode(token);
  let hosts = JSON.parse(decodedToken.hosts);
  const [curServer, setCurServer] = useState(hosts[0].ip);
  const [serverNames, setServerNames] = useState([]);
  const [selectedServer, setSelectedServer] = useState(serverNames[0]);
  const [pwd, setPwd] = useState("/");
  const [files, setFiles] = useState([]);
  const [directories, setDirectories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const inputEl = useRef();

  function uploadFile() {
    let fileList = inputEl.files[0];
    console.log(fileList);
  }
  
  function createFile() {
    setCreateModal(true);
  }

  useEffect(() => {
    async function getItems() {
      var axios = require("axios");
      var data = JSON.stringify({
        command: "get-items",
        req: {
          path: "/",
        },
        host: curServer
      });

      var config = {
        method: "post",
        url: "/FileManager/ExecuteCommand",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: data,
      };

      const response = await axios(config);
      const foundItems = response.data;
      console.log(foundItems);
      setDirectories(foundItems.Directories);
      setFiles(foundItems.Files);
    }
    getItems();
    let sNames = JSON.parse(decodedToken.hosts);
    sNames = sNames.map((server) => server.hostname);
    setServerNames(sNames);
    setSelectedServer(sNames[0]);
  }, []);

  
  return (
    <>
      {showModal ? (
        <Modal
          itemName={selectedItem.name}
          itemType={selectedItem.type}
          setShowModal={setShowModal}
          curServer={curServer}
          pwd={pwd}
          setPwd={setPwd}
        />
      ) : createModal ? (
        <CreateModal 
          setCreateModal={setCreateModal}
          pwd={pwd}
          curServer={curServer}
        />
        ) : (
        <></>
      )}
      <div style={{ filter: showModal || createModal ? "blur(5px)" : "none" }}>
        <NavBar serverNames={serverNames} curServer={curServer} setPwd={setPwd} setDirectories={setDirectories} setFiles={setFiles} setCurServer={setCurServer} setSelectedServer={setSelectedServer} />
        <header className="header">
          <div className="two-items-left">
            <div className="buttons-container">
              <div className="create-btn" onClick={createFile}>
                <div style={{ width: "30px" }}>
                  <Create />
                </div>
                <b>Create</b>
              </div>

              <div style={{ cursor: 'pointer' }}>
       
                <input type="file" id="upload-input" ref={inputEl} onChange={uploadFile}></input>
              </div>
            </div>
            <input
              style={{ float: "right" }}
              type="search"
              id="query"
              name="q"
              placeholder="Search..."
            />
          </div>
        </header>
        <div className="file-content">
          <div style={{ marginLeft: "330px", marginTop: "20px" }}>
            <h3 style={{ fontWeight: "700" }}>
              {selectedServer} @ {pwd}
            </h3>
            <FilesTable
              setShowModal={setShowModal}
              files={files}
              directories={directories}
              setSelectedItem={setSelectedItem}
              setPwd={setPwd}
              setFiles={setFiles}
              setDirectories={setDirectories}
              pwd={pwd}
              curServer={curServer}
              setCurServer={setCurServer}
            />
          </div>
        </div>
      </div>
    </>
  );
};

