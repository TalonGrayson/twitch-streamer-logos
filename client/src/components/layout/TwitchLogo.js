import React, { Component } from "react";

class TwitchLogo extends Component {
  render() {
    return (
      <img
        src={this.props.streamerInfo.logo}
        className={this.props.streamerInfo.logoClass}
        alt={this.props.streamerInfo.streamer + "'s logo"}
      />
    );
  }
}

export default TwitchLogo;
