import React from "react";
import logo from "../logo.png";
import fbButton from "./fbButton";
import { Redirect } from "react-router";
import Cookies from "js-cookie";

import axios from "axios";

import "./App.css";
//46215baaf894fc475faefe6a393e4b90

class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      button: fbButton,
      hasError: false,
      redirect: false
    };
  }
  async onClick(res) {
    console.log(this);
    try {
      const api = await axios.post("http://localhost:3001/api/v1/auth/login", {
        facebook_access_token: res.accessToken
      });

      Cookies.set("jwt", api.data.jwt, { expires: api.data.jwt.expiresIn });

      this.auth.setState({ redirect: true });
      console.log(this);
    } catch (err) {
      console.log(err);
    }
  }
  componentDidCatch(error, info) {
    this.setState({ hasError: true });
  }
  render() {
    if (this.state.hasError) {
      return <h1>Error</h1>;
    }
    console.log(this);
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
