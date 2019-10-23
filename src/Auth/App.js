import React from "react";
import logo from "../logo.png";
import fbButton from "./fbButton";
import { Redirect } from "react-router";
import Cookies from "js-cookie";

import jwt from "../lib/jwt";
import api from "../lib/api";

import "./App.css";
//46215baaf894fc475faefe6a393e4b90

class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      button: fbButton,
      hasError: false,
      redirect: false,
      jwt: null
    };
  }
  async onClick(res) {
    api
      .post("/auth/login", {
        token: res.accessToken
      })
      .then(res => {
        Cookies.set("jwt", res.data.jwt);
      })
      .then(() => this.auth.setState({ redirect: true }))
      .catch(err => this.auth.setState({ hasError: true }));
  }

  componentDidCatch(error, info) {
    console.log(123213 + "f123");
    this.setState({ hasError: true });
  }
  render() {
    console.log(process.env);
    const jwtObj = Cookies.get("jwt") ? JSON.parse(Cookies.get("jwt")) : null;
    console.log(jwtObj);
    if (jwtObj && jwt.expire(jwtObj.expiresIn)) {
      return <Redirect to="/dashboard" />;
    }

    //console.log(this.state);
    if (this.state.redirect) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          {}
          <p
            style={{
              color: "red",
              visibility: this.state.hasError ? "visible" : "hidden"
            }}
          >
            Some error with auth
          </p>

          <this.state.button onClick={this.onClick} auth={this} />
        </header>
        <div>123123123</div>
      </div>
    );
  }
}

export default Auth;
