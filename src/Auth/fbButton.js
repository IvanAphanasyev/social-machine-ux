import React from "react";

import FacebookLogin from "react-facebook-login";

export default class fbButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // console.log(this);
    return (
      <FacebookLogin
        appId="502524423931075" //APP ID NOT CREATED YET
        fields="name,email,picture"
        callback={this.props.onClick}
        buttin={this}
        auth={this.props.auth}
        SameSite="None"
      />
    );
  }
}
