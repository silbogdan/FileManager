import React, { useState } from "react";
import { ServerIcon } from "../assets/ServerIcon";
import { PlusIcon } from "../assets/PlusIcon";

export const NavBar = ({ serverNames }) => {
  return (
    <nav className="side-navbar">
      <div className="servers-container">
        <h1>File Manager</h1>
        <div>
          {serverNames.map((server) => (
            <div className="server-entry">
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
