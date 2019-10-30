import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import Cookies from "js-cookie";

import Auth from "./Auth/App";
import Dashboard from "./Dashboard/DashBoard";

export default function BasicExample() {
  return (
    <Router>
      <Switch>
        <Route exact path="/auth" component={Auth} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route
          render={() =>
            Cookies.get("jwt") ? (
              <Redirect to="/dashboard" />
            ) : (
              <Redirect to="/auth" />
            )
          }
        />
      </Switch>
    </Router>
  );
}
