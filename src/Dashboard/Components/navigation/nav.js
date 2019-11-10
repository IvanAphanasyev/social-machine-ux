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
      <div className="profile" onClick={props.setVisible}>
        <div className="profile-picture ">
          <img alt="facebookPhoto" src={props.user && props.user.picture} />
        </div>
        <div className="profile-name">
          <span>{props.user && props.user.name}</span>
        </div>
      </div>
      <div style={{ flexGrow: "1" }} />
      <div className="nav-list">
        <a href="/#">
          <span>Getting Started</span>
        </a>

        <a href="/#">
          <span>FAQ</span>
        </a>

        <a href="/#">
          <span>
            {" "}
            GitHub
            <i className="fab fa-github"></i>
          </span>
        </a>

        <a href="/#">
          <span>Need help?</span>
        </a>
      </div>
    </nav>
  );
};
export default navigation;
