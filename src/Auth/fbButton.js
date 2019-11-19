import React from "react";

import FacebookLogin from "react-facebook-login";
const FbButton = props => {
  return (
    <FacebookLogin
      appId="502524423931075"
      fields="name,email,picture"
      callback={props.onClick}
      icon="fab fa-facebook-f"
      state="111"
    />
  );
};

export default FbButton;
/* <FacebookLogin
        appId="502524423931075" //APP ID NOT CREATED YET
        fields="name,email,picture"
        callback={this.props.onClick}
        auth={this.props.auth}
      />*/
