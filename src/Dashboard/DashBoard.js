import React, { useState, useEffect, useReducer } from "react";
import { Redirect } from "react-router";

import "./Dashboard.scss";

import Cookies from "js-cookie";

import Components from "./Components";

import api from "../lib/api";

const Dashboard = () => {
  const [isVisibleMenu, setVisibleMenu] = useState(true);
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
