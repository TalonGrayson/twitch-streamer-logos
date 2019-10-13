import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark navbar-shaded">
        <div className="container">
          <Link to="/" className="navbar-brand">
            Streamer Logos
          </Link>

          <button
            className="btn-twitch btn-shadow"
            onClick={this.props.authTwitch}
          >
            <img
              className="btn-icon"
              src={require("../../img/Glitch_White_RGB.png")}
              alt="Glitch"
            />
            &nbsp;Login with Twitch
          </button>
        </div>
      </nav>
    );
  }
}

export default Navbar;
