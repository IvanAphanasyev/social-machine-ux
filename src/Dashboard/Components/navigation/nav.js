import React from "react";

import logo from "./Social Machine.svg";

import "./nav.scss";

const navigation = props => {
  return (
    <div className="navigation">
      <nav>
        <div
          className="navigation-target"
          onClick={props.showPanel}
          style={{ width: props.isLeftVisible ? "15%" : "" }}
        >
          <i className="fas fa-align-justify" />
        </div>
        <div style={{ flexGrow: "1" }}></div>

        <img src={logo} alt="logo" />
      </nav>
    </div>
  );
};
export default navigation;
