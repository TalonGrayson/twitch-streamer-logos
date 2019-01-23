import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./App.css";
import "./Animate.css";

import Navbar from "./components/layout/Navbar";
import FrandProfile from "./components/layout/FrandProfile";

export default class App extends Component {
  render() {
    return (
      <Router>
        <div id="root-element">
          <Navbar />
          <div className="App">
            <Route exact path="/" component={FrandProfile} />
          </div>
        </div>
      </Router>
    );
  }
}
