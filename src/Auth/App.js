import React, { useState } from "react";
import { Redirect } from "react-router";

import logo from "../logo.png";
import Cookies from "js-cookie";
import FbButton from "./fbButton";

import api from "../lib/api";

import "./App.css";

export default function Auth() {
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState(false);

  const handler = res => {
    console.log(res);
    api
      .post(
        "/auth/login",
        {
          token: res.accessToken
        },
        {}
      )
      .then(res => {
        console.log("set cookies after login");
        Cookies.set("jwt", res.data.jwt);
      })
      .then(() => setRedirect(true))
      .catch(() => setError(true));
  };
  return (
    <div className="App">
      {redirect && <Redirect to="/dashboard" />}
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p
          style={{
            color: "red",
            visibility: error ? "visible" : "hidden"
          }}
        >
          Some error with auth
        </p>
        <FbButton onClick={handler} auth={this} />
      </header>
    </div>
  );
}
