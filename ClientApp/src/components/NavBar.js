import React, { useState } from "react";
import { ServerIcon } from "../assets/ServerIcon";
import { PlusIcon } from "../assets/PlusIcon";
import jwt_decode from 'jwt-decode';

export const NavBar = ({ serverNames, curServer, setPwd, setDirectories, setFiles, setCurServer, setSelectedServer }) => {
  const token = localStorage.getItem('token');
  const decodedToken = jwt_decode(token);

  async function changeServer(e, serverIdx) {
    e.preventDefault();
    console.log("Changing server entry");

    const hosts = JSON.parse(decodedToken.hosts);
    setCurServer(hosts[serverIdx].ip);

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
      setSelectedServer(hosts[serverIdx].hostname);
      setPwd('/');
    }

  return (
    <nav className="side-navbar">
      <div className="servers-container">
        <h1>File Manager</h1>
        <div>
          {serverNames.map((server, idx) => (
            <div className="server-entry" onClick={(e) => changeServer(e, idx)}>
              <div style={{ width: "30px", height: "30px" }}>
                <ServerIcon />
              </div>
              <p style={{ marginLeft: "15px" }}>{server}</p>
            </div>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            gap: "10px",
          }}
        >
          <div style={{ width: "30px" }}>
            <PlusIcon />
          </div>
          <b style={{ marginTop: "2px" }}>Connect to a server</b>
        </div>
      </div>
      <div className="greet-container"></div>
    </nav>
  );
};
