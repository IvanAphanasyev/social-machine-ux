import React, { useState, useEffect, useReducer } from "react";
import { slide as Menu } from "react-burger-menu";
import Cookies from "js-cookie";
import Loader from "./helper";

import groupImage from "./facebookGroup.jpg";

import api from "../../../lib/api";

import "./accPanel.scss";

const AccPanel = props => {
  // eslint-disable-next-line no-unused-vars

  const [staticGroup, setStaticGroup] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

  return (
    <div id="outer-container">
      {props.isVisible && (
        <div className="overlay" onClick={props.setVisible}></div>
      )}
      <Menu isOpen={props.isVisible} tabIndex="3" crossButtonClassName="">
        <div className="menuContent" tabIndex="3">
          <button className="close" onClick={props.setVisible}></button>
          <UserStatic form={props.form} setForm={props.setForm} />
          <div className="options">
            <div
              className="options-btn"
              onClick={() => setStaticGroup(false)}
              style={{ backgroundColor: !staticGroup && "#34495e" }}
            >
              Facebook groups
            </div>
            <div
              className="options-btn"
              onClick={() => setStaticGroup(true)}
              style={{ backgroundColor: staticGroup && "#34495e" }}
            >
              Saved groups
            </div>
          </div>
          <Content staticGroup={staticGroup} />
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

const Saved = group => {
  const [hover, setHover] = useState(false);

  const num =
    !isNaN(parseFloat(group.identifier)) && isFinite(group.identifier);
  const [fbGroup, setfbGroup] = useState(null);
  useEffect(() => {
    !fbGroup &&
      num &&
      api
        .get(`/user/groups/${group.identifier}`)
        .then(resonse => setfbGroup(resonse.data))
        .catch(err =>
          console.log(`in Saved with identifer group - ${group.identifier}`)
        );
  });
  return (
    <div
      className="groups-content-group"
      onMouseEnter={() => !hover && setHover(true)}
      onMouseLeave={() => hover && setHover(false)}
      key={group.id}
    >
      {num ? (
        fbGroup ? (
          <div
            className="groups-content-group-target"
            style={{
              backgroundImage: `url(${fbGroup && fbGroup.cover.source})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              opacity: !num && "0.5"
            }}
          />
        ) : (
          <Loader />
        )
      ) : (
        <div
          className="groups-content-group-target"
          style={{
            backgroundImage: `url(${groupImage})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            opacity: !num && "0.5"
          }}
        />
      )}
      {num && hover ? (
        <div className="groups-content-group-animation">
          <div className="title">{fbGroup && fbGroup.name}</div>
        </div>
      ) : (
        !num && (
          <div className="groups-content-group-animation">
            <div className="title">{group.identifier}</div>
          </div>
        )
      )}
    </div>
  );
};

const AddGroup = props => {
  const [value, setValue] = useState("");
  const [invalid, setInvalid] = useState(false);

  const clickHandle = () => {
    const pattern = /^(https:\/\/www.facebook.com\/groups\/)(\w+)$/;
    if (pattern.test(value)) {
      const identifier = pattern.exec(value)[2];
      api
        .post("/user/savedGroups/save", { identifier: identifier })
        .then(response => {
          props.update();
          console.log("update?");
        })
        .catch(err => console.log(err));
    } else {
      setInvalid(true);
    }
  };

  return (
    <div className="groups-add">
      <input
        type="text"
        name="group"
        value={value}
        onChange={e => {
          setValue(e.target.value);
          setInvalid(false);
        }}
        style={{ border: invalid && "3px solid red" }}
      />
      <button className="groups-add-hight" onClick={clickHandle}>
        <span>Add group</span>
      </button>
      <button className="groups-add-low" onClick={clickHandle}>
        <span>+</span>
      </button>
    </div>
  );
};

const FacebookGroups = props => {
  const [fbGroups, setFbGroups] = useState(null);
  useEffect(() => {
    !fbGroups &&
      api.get("/user/groups").then(response => setFbGroups(response.data));
  });
  return fbGroups ? (
    fbGroups.map(group => {
      return <Group {...group} key={group.id} />;
    })
  ) : (
    <Loader />
  );
};

const SavedGroups = props => {
  const [saved, setSaved] = useState(null);
  useEffect(() => {
    !saved &&
      api.get("/user/savedGroups").then(response => setSaved(response.data));
  });
  return saved ? (
    saved.map(group => {
      return <Saved {...group} key={group.id} />;
    })
  ) : (
    <Loader />
  );
};

const Content = props => {
  // eslint-disable-next-line no-unused-vars
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

  return (
    <div className="groups">
      <div
        className="groups-content"
        style={{
          overflowY: "scroll"
        }}
      >
        {}
        {!props.staticGroup ? (
          <FacebookGroups groups={props.groups} />
        ) : (
          <SavedGroups saved={props.saved} />
        )}
      </div>
      {props.staticGroup && (
        <AddGroup
          update={() => {
            forceUpdate();
            console.log("here");
          }}
        />
      )}
    </div>
  );
};

const UserStatic = props => {
  let passwordInput;
  const [wraper, setWraper] = useState(true);
  useEffect(() => {
    !passwordInput.value && passwordInput.focus();
  });
  const [user, setUser] = useState(null);

  useEffect(() => {
    !user &&
      Cookies.get("jwt") &&
      api.get("/user").then(response => {
        setUser(response.data);
      });
  });
  return (
    <div className="user-info">
      <div className="user-info-email">
        <input
          type="text"
          id="name"
          autoComplete="new-password"
          required="required"
          readOnly={user && user.email}
          value={(user && user.email) || undefined}
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
  );
};
