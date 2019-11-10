import React from "react";
import "./mainContent.scss";

import api from "../../../lib/api";
const MainContent = props => {
  return (
    <div className="mainContent">
      <button
        className="start"
        onClick={() => {
          console.log(props);
          api.post("/execute", props).then(result => console.log(result));
        }}
      >
        Start
      </button>
    </div>
  );
};
export default MainContent;
