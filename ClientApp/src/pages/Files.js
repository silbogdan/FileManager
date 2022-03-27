import React, { useState } from "react";
import "../styles/Files.css";
import { DirIcon } from "../assets/DirIcon";
import { FileIcon } from "../assets/FileIcon";
import { NavBar } from "../components/NavBar";
import { FilesTable } from "../components/FilesTable";
import { Modal } from "../components/Modal";

export const Files = () => {
  const [serverNames, setServerNames] = useState([
    "filehostvm1",
    "filehostvm2",
    "filehostvm3",
  ]);
  const [selectedServer, setSelectedServer] = useState("filehostvm1");
  const [pwd, setPwd] = useState("/home/user");
  const [files, setFiles] = useState([
    { name: "file1", size: "2.4" },
    { name: "file2", size: "3.2" },
  ]);
  const [directories, setDirectories] = useState(["dir1", "dir2"]);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});

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
            />
          </div>
        </div>
      </div>
    </>
  );
};
