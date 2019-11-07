import React, { useState, useReducer, useEffect } from "react";
import { slide as Menu } from "react-burger-menu";
import Cookies from "js-cookie";
import Loader from "./helper";

import "./accPanel.scss";

const AccPanel = props => {
  let passwordInput;
  // eslint-disable-next-line no-unused-vars
  const [wraper, setWraper] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
  useEffect(() => {
    passwordInput.focus();
  });

  return (
    <div id="outer-container">
      <Menu isOpen={true} tabIndex="3">
        <div className="menuContent" tabIndex="3">
          <div className="user-info">
            <div className="user-info-photo">
              <img alt="facebookPhoto" src={props.user && props.user.picture} />
            </div>
            <div className="user-info-content">
              <div className="user-info-content-static">
                <div className="user-info-content-static-facebookName">
                  Name:
                  <br /> {props.user && props.user.name}
                </div>
                <div className="user-info-content-static-email">
                  Email:
                  <br /> {props.user && props.user.email}
                </div>
              </div>
              <div className="user-info-content-input">
                <label>
                  {"Password: "}
                  <br />
                  <div className="user-info-content-input-target">
                    <input
                      type={wraper ? "password" : "text"}
                      name="password"
                      ref={input => {
                        passwordInput = input;
                      }}
                    ></input>
                    <div
                      className="user-info-content-input-target-wraper"
                      onClick={() => setWraper(!wraper)}
                    >
                      {wraper ? (
                        <div className="user-info-content-input-target-wraper-eye">
                          <i className="fas fa-eye"></i>
                        </div>
                      ) : (
                        <div className="user-info-content-input-target-wraper-points">
                          <i className="fas fa-eye-slash"></i>
                        </div>
                      )}
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>
          <div className="groups">
            <div
              className="groups-content"
              style={{
                overflowY: "scroll"
              }}
            >
              {props.groups ? (
                props.groups.map(group => {
                  return <Group {...group} key={group.id} />;
                })
              ) : (
                <Loader />
              )}
            </div>
          </div>
          <div className="footer">
            <div className="footer-item">
              <span className="footer-item-about" href="/#">
                About
              </span>
            </div>
            <div className="footer-item" style={{ color: "#34495e" }}>
              |
            </div>
            <div className="footer-item">
              <span className="footer-item-fbp" href="/#">
                Go to Facebook page
              </span>
            </div>
            <div className="footer-item" style={{ color: "#34495e" }}>
              |
            </div>
            <div className="footer-item">
              <span
                onClick={() => {
                  Cookies.remove("jwt");
                  props.update();
                }}
                className="footer-item-logout"
              >
                Logout
              </span>
            </div>
          </div>
        </div>
      </Menu>
    </div>
  );
};

export default AccPanel;

const Group = group => {
  const [hover, setHover] = useState(false);
  const background = group.cover.source;
  return (
    <div>
      <div
        className="groups-content-group"
        key={group.id}
        style={{
          backgroundImage: hover && `url(${background})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          opacity: hover && "0.5",
          borderRadius: "10%"
        }}
        onMouseEnter={() => !hover && setHover(true)}
        onMouseLeave={() => hover && setHover(false)}
      >
        <div style={{ visibility: hover && "hidden" }}>{group.name}</div>
      </div>
      {hover && (
        <div className="animation" style={{ position: "absolute" }}>
          <div className="title">{group.name}</div>
        </div>
      )}
    </div>
  );
};
