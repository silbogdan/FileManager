import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../styles/Files.css";
import { DirIcon } from "../assets/DirIcon";
import { FileIcon } from "../assets/FileIcon";
import { NavBar } from "../components/NavBar";
import { FilesTable } from "../components/FilesTable";
import { Modal } from "../components/Modal";
import jwt_decode from "jwt-decode";
import axios from "axios";

export const Files = () => {
  const token = localStorage.getItem("token");
  const decodedToken = jwt_decode(token);
  const [serverNames, setServerNames] = useState([]);
  const [selectedServer, setSelectedServer] = useState(serverNames[0]);
  const [pwd, setPwd] = useState("/");
  const [files, setFiles] = useState([]);
  const [directories, setDirectories] = useState(["dir1", "dir2"]);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});

  useEffect(() => {
    async function getItems() {
      var axios = require("axios");
      var data = JSON.stringify({
        command: "get-items",
        req: {
          path: "/",
        },
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

  }, []);

  return (
    <>
      {showModal ? (
        <Modal
          itemName={selectedItem.name}
          itemType={selectedItem.type}
          setShowModal={setShowModal}
        />
      ) : (
        <></>
      )}
      <div style={{ filter: showModal ? "blur(5px)" : "none" }}>
        <NavBar serverNames={serverNames} />
        <header className="header">Lol ce e cu mine aici</header>
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
            />
          </div>
        </div>
      </div>
    </>
  );
};
