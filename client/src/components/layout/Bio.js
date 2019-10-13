import React, { Component } from "react";

class Bio extends Component {
  render() {
    return (
      <div className={this.props.streamerInfo.bioClass}>
        <p>{this.props.streamerInfo.bio}</p>
      </div>
    );
  }
}

export default Bio;
