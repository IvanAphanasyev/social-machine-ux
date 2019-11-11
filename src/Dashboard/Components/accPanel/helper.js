import React from "react";
import "./helper.scss";
const Helper = () => {
  return (
    <div
      className="lds-spinner"
      style={{
        alignSelf: "center",
        margin: "auto",
        justifyContent: "center",
        textAlign: "center",
        verticalAlign: "middle"
      }}
    >
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Helper;
