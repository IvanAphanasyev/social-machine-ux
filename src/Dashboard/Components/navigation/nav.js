import React from "react";

import "./nav.scss";

const navigation = props => {
  return (
    <nav>
      {/*
      {!props.isLeftVisible && (
        <div className="navigation-target-invisible" onClick={props.showPanel}>
          <i className="fas fa-align-justify" />
        </div>
      )}
      {props.isLeftVisible && (
        <div className="navigation-target-visible" onClick={props.showPanel}>
          <i className="fas fa-arrow-left"></i>
        </div>
      )}*/}

      <div style={{ flexGrow: "1" }}></div>
      <ul>
        <li>
          <a href="/#">Getting Started</a>
        </li>
        <li>
          <a href="/#">FAQ</a>
        </li>
        <li>
          <a href="/#">
            GitHub
            <i className="fab fa-github"></i>
          </a>
        </li>
        <li>
          <a href="/#">Need help?</a>
        </li>
      </ul>
    </nav>
  );
};
export default navigation;
