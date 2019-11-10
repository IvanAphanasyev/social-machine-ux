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
      {props.isVisible && (
        <div className="overlay" onClick={props.setVisible}></div>
      )}
      <Menu isOpen={props.isVisible} tabIndex="3" crossButtonClassName="">
        <div className="menuContent" tabIndex="3">
          <button className="close" onClick={props.setVisible}></button>
          <div className="user-info">
            <div className="user-info-email">
              <input
                type="text"
                id="name"
                //autoComplete="new-password"
                required="required"
                readOnly={props.user && props.user.email}
                value={(props.user && props.user.email) || undefined}
                onChange={e => {
                  props.form.login = e.target.value;
                  props.setForm(props.form);
                }}
              ></input>
              <label
                htmlFor="name"
                style={{
                  top: props.user && props.user.email && "-1em",
                  fontSize: props.user && props.user.email && "0.8em"
                }}
              >
                Email/Phone
              </label>
            </div>
            <div className="user-info-pass">
              <div className="user-info-pass-input">
                <input
                  type={!wraper ? "text" : "password"}
                  id="pass"
                  required="required"
                  //autoComplete="new-password"
                  ref={input => {
                    passwordInput = input;
                  }}
                  onChange={e => {
                    props.form.password = e.target.value;
                    props.setForm(props.form);
                  }}
                />
                <label htmlFor="pass">Password</label>
                <div
                  className="user-info-pass-input-wraper"
                  onClick={() => setWraper(!wraper)}
                >
                  {wraper ? (
                    <i className="far fa-eye" />
                  ) : (
                    <i className="far fa-eye-slash" />
                  )}
                </div>
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
            <div className="footer-item footer-target">
              <span className="footer-item-fbp #fb" href="/#">
                Go to Facebook page
              </span>
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
    <div
      className="groups-content-group"
      onMouseEnter={() => !hover && setHover(true)}
      onMouseLeave={() => hover && setHover(false)}
      key={group.id}
    >
      <div
        className="groups-content-group-target"
        style={{
          backgroundImage: `url(${background})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat"
        }}
      ></div>
      {hover && (
        <div className="groups-content-group-animation">
          <div className="title">{group.name}</div>
        </div>
      )}
    </div>
  );
};
