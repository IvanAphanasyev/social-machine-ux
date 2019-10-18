import React from "react";
import "./Dashboard.scss";
import logo from "./image (3).png";

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="block">
        <header>
          <div className="navContainer">
            <nav>
              <a href="/dashboard">element</a>
              <a href="/dashboard">element</a>
              <a href="/dashboard">element</a>
              <a href="/dashboard">element</a>
            </nav>
          </div>
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>
        </header>
        <section className="main">
          <p>Now here need information about auth user</p>
          <p>need implement how to target a group</p>
          <p>button for exevuting</p>
        </section>
        <footer className="foot">
          <span>footer</span>
        </footer>
      </div>
    );
  }
}
