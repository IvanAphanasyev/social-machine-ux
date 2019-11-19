import React, { useState, useReducer } from "react";
import { Redirect } from "react-router";

import "./Dashboard.scss";

import Cookies from "js-cookie";

import Components from "./Components";

const Dashboard = () => {
  const [isVisibleMenu, setVisibleMenu] = useState(false);
  const [form, setForm] = useState({
    login: "",
    password: ""
  });
  // eslint-disable-next-line no-unused-vars
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

  return (
    <div className="block">
      {!Cookies.get("jwt") && <Redirect to="/" />}
      {
        <Components.AccPanel
          update={forceUpdate}
          isVisible={isVisibleMenu}
          setVisible={() => setVisibleMenu(!isVisibleMenu)}
          form={form}
          setForm={setForm}
        />
      }
      <header>
        <Components.Navigation
          setVisible={() => setVisibleMenu(!isVisibleMenu)}
        />
      </header>
      <section>
        <Components.MainContetn {...form} />
      </section>
    </div>
  );
};
export default Dashboard;
