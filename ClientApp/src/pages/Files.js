import React, { useState } from "react";
import "../styles/Files.css";
import { DirIcon } from "../assets/DirIcon";
import { FileIcon } from "../assets/FileIcon";
import { NavBar } from "../components/NavBar";
import { FilesTable } from "../components/FilesTable";

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

  return (
    <>
      <NavBar serverNames={serverNames} />
      <header className="header">Lol ce e cu mine aici</header>
      <div className="file-content">
        <div style={{ marginLeft: "330px", marginTop: "20px" }}>
          <h3 style={{ fontWeight: "700" }}>
            {selectedServer} @ {pwd}
          </h3>
          <FilesTable files={files} directories={directories} />
        </div>
      </div>
    </>
  );
};
