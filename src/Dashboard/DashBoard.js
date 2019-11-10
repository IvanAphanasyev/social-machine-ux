import React, { useState, useEffect, useReducer } from "react";
import { Redirect } from "react-router";

import "./Dashboard.scss";

import Cookies from "js-cookie";

import Components from "./Components";

import api from "../lib/api";

const Dashboard = () => {
  const [isVisibleMenu, setVisibleMenu] = useState(false);
  const [form, setForm] = useState({
    login: "",
    password: ""
  });
  const [user, setUser] = useState(null);
  const [groups, setGroups] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

  const getUser = async () => {
    api
      .get("/user")
      .then(response => {
        setUser(response.data);
      })
      .then(() => api.get("/user/groups"))
      .then(response => setGroups(response.data))
      .catch(err => {
        Cookies.remove("jwt");
        forceUpdate();
      });
  };

  useEffect(() => {
    !user && Cookies.get("jwt") && getUser();
  });

  return (
    <div className="block">
      {!Cookies.get("jwt") && <Redirect to="/" />}
      {
        <Components.AccPanel
          user={user}
          update={forceUpdate}
          groups={groups}
          isVisible={isVisibleMenu}
          setVisible={() => setVisibleMenu(!isVisibleMenu)}
          form={form}
          setForm={setForm}
        />
      }
      <header>
        <Components.Navigation
          setVisible={() => setVisibleMenu(!isVisibleMenu)}
          user={user}
        />
      </header>
      <section>
        <Components.MainContetn {...form} />
      </section>
    </div>
  );
};
export default Dashboard;

/*
export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navigation: navigation,
      password: "",
      jwt: Cookies.get("jwt"),
      user: null,
      groups: null,
      targetGroupId: null,
      targetGroup: null,
      exec: null
    };
  }
  execute(state) {
    if (!state.password) {
      console.log("password req animation");
      this.setState({ passwordAnimation: true });
      return;
    }
    const options = {
      pass: state.password,
      idGroup: state.targetGroupId
    };
    api
      .post("/execute", options, {
        headers: { accesstoken: JSON.parse(this.state.jwt).accessToken }
      })
      .then(res => {
        console.log(res);
        return this.setState({ exec: res });
      });
  }

  componentDidMount() {
    !this.state.user &&
      api
        .get("/user", {
          headers: { accesstoken: JSON.parse(this.state.jwt).accessToken }
        })
        .then(user => this.setState({ user }));
  }
  componentDidUpdate() {
    !this.state.groups &&
      api
        .get("/user/groups", {
          headers: { accesstoken: JSON.parse(this.state.jwt).accessToken }
        })
        .then(groups => this.setState({ groups }));
    !this.state.targetGroup &&
      this.state.targetGroupId &&
      api
        .get(`/user/groups/${this.state.targetGroupId}`, {
          headers: { accesstoken: JSON.parse(this.state.jwt).accessToken }
        })
        .then(targetGroup => this.setState({ targetGroup }));
  }

  render() {
    if (!this.state.jwt || jwt.expire(JSON.parse(this.state.jwt))) {
      return <Redirect to="/" />;
    }
    const user = this.state.user ? this.state.user.data : null;
    const groups = this.state.groups ? this.state.groups.data : null;
    //const gId = this.state.targetGroupId ? this.state.targetGroupId : null;
    const group = this.state.targetGroup ? this.state.targetGroup.data : null;
    console.log("grp:", group);
    console.log(this.state);
    return (
      <div className="block">
        <this.state.navigation />
        <section>
          <div className="userContent">
            <div className="picture">
              <img src={user && user.picture} alt="fb_foto" />
            </div>
            <div className="name">
              <p>{user && user.name}</p>
            </div>
            <div className="email">
              <p>{user && user.email}</p>
            </div>

            <div className="pass">
              <label>
                {"password: "}
                <input
                  type="password"
                  name="password"
                  value={this.state.password}
                  style={{
                    borderColor: this.state.passwordAnimation ? "red" : ""
                  }}
                  onChange={event => {
                    this.setState({
                      password: event.target.value,
                      passwordAnimation: false
                    });
                  }}
                ></input>
              </label>
            </div>
            <div
              className="logout"
              onClick={() => {
                Cookies.remove("jwt");
                this.setState({ jwt: null });
              }}
            >
              logout
            </div>
          </div>
          {!this.state.targetGroupId && (
            <div
              className="mainContent"
              style={{
                overflowY: "scroll",
                height: "90vh"
              }}
            >
              {groups &&
                groups.map(group => {
                  const background = group.cover.source;
                  return (
                    <div
                      className="general"
                      key={group.id.toString()}
                      onClick={() => this.setState({ targetGroupId: group.id })}
                    >
                      <div
                        className="groupContent"
                        style={{
                          backgroundImage: `url(${background})`,
                          backgroundPosition: "center",
                          backgroundSize: "cover",
                          backgroundRepeat: "no-repeat"
                        }}
                      ></div>
                      <div className="animation">
                        <div className="title">{group.name}</div>
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
          {this.state.targetGroupId && (
            <div className="targetContent">
              <div
                className="back"
                onClick={() =>
                  this.setState({
                    targetGroupId: null,
                    targetGroup: null,
                    exec: null
                  })
                }
              >
                {"<"}
              </div>
              {this.state.targetGroup && (
                <div className="targetGroup">
                  <div
                    className="target"
                    style={{
                      backgroundImage: `url(${group.cover.source})`,
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat"
                    }}
                  >
                    <p className="title">{group.name}</p>
                    <p className="desc">{group.description}</p>
                  </div>
                  <div
                    className="exec"
                    onClick={() => this.execute(this.state)}
                    style={{
                      cursor: "pointer",
                      background: this.state.exec ? "green" : ""
                    }}
                  >
                    Exexution
                  </div>
                </div>
              )}
            </div>
          )}
          {this.state.exec && <div>{this.state.exec.data}</div>}
        </section>
      </div>
    );
  }
}
*/
