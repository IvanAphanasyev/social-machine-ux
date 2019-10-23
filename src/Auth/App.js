import React from "react";
import logo from "../logo.png";
import fbButton from "./fbButton";
import { Redirect } from "react-router";
import Cookies from "js-cookie";

import jwt from "../lib/jwt";

import axios from "axios";

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
    try {
      const api = await axios.post("http://localhost:7777/api/v1/auth/login", {
        token: res.accessToken
      });
      if (!api) this.auth.setState({ hasError: true });

      Cookies.set("jwt", api.data.jwt, { expires: api.data.jwt.expiresIn });
      console.log(Cookies.get("jwt"));

      this.auth.setState({ redirect: true });
    } catch (err) {
      this.auth.setState({ hasError: true });
    }
  }
  componentDidCatch(error, info) {
    this.setState({ hasError: true });
  }
  render() {
    console.log(process.env.NODE_ENV);
    const jwtObj = Cookies.get("jwt") ? JSON.parse(Cookies.get("jwt")) : null;
    console.log(jwtObj);
    if (jwtObj && jwt.expire(jwtObj.expiresIn)) {
      return <Redirect to="/dashboard" />;
    }

    if (this.state.hasError) {
      return <h1>Error</h1>;
    }
    //console.log(this.state);
    if (this.state.redirect) {
      return <Redirect to="/dashboard" />;
    }
    let localClass = this.state.error ? "error" : "hidden";
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <this.state.button onClick={this.onClick} auth={this} />
          <p className={localClass}>Some error with auth</p>
        </header>
        <div>123123123</div>
      </div>
    );
  }
}

export default Auth;
