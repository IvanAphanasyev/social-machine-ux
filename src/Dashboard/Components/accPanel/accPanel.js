import React, { useState, useReducer } from "react";
import Cookies from "js-cookie";

import "./accPanel.scss";

const AccPanel = props => {
  // eslint-disable-next-line no-unused-vars
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

  return (
    props.isVisible && (
      <div className="left-panel">
        <div className="picture"></div>
        <div className="name"></div>
        <div className="email"></div>

        <div className="pass">
          <label>
            {"password: "}
            <input type="password" name="password"></input>
          </label>
        </div>
        <div
          className="logout"
          onClick={() => {
            console.log(12321321313132131);
            Cookies.remove("jwt");
            forceUpdate();
          }}
        >
          logout
        </div>
      </div>
    )
  );
};

export default AccPanel;
