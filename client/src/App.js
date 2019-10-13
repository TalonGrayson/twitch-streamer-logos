import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";

import "./App.css";
import "./Animate.css";

import Navbar from "./components/layout/Navbar";
import FrandProfile from "./components/layout/FrandProfile";

export default class App extends Component {
  authTwitch = () => {
    axios
      .get("/auth/twitch", { dataType: "jsonp" })
      .then(console.log("Authing..."));
  };

  render() {
    return (
      <Router>
        <div id="root-element">
          <Navbar authTwitch={this.authTwitch} />
          <div className="App">
            <Route exact path="/" component={FrandProfile} />
          </div>
        </div>
      </Router>
    );
  }
}
