import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Landing extends Component {
  render() {
    return (
      <div>
        <header className="App">
          <Link to="auth/twitch" className="btn-twitch btn-shadow">
            <img
              className="btn-icon"
              src={require("../../img/Glitch_White_RGB.png")}
              alt="Glitch"
            />
            &nbsp;Login with Twitch
          </Link>
        </header>
      </div>
    );
  }
}
