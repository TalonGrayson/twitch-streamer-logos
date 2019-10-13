import React, { Component } from "react";
import Glitch from "../../img/Glitch_White_RGB.png";
import SearchBar from "./SearchBar";
import TwitchLogo from "./TwitchLogo";
import Bio from "./Bio";
import axios from "axios";

const initialState = {
  logoClass: "logo animated bounceIn",
  bioClass: "bio animated fadeInUp",
  streamer: "",
  logo: Glitch,
  bio: "Find a streamer's logo, or log in an upload your own!"
};

export default class FrandProfile extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    if (event.target.value) {
      this.setState({
        streamer: event.target.value,
        logoClass: "logo animated bounceOut",
        bioClass: "bio animated fadeOutDown"
      });
    } else {
      this.setState(initialState);
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    axios.get(`/api/v1/streamer/${this.state.streamer}`).then(res => {
      if (res.status === 200) {
        this.setState({
          streamer: res.data.displayName,
          logo: res.data.logo,
          bio: res.data.bio,
          logoClass: "logo animated bounceIn",
          bioClass: "bio animated fadeInUp"
        });
      } else {
        this.setState(initialState);
      }
    });
  }

  render() {
    return (
      <div className="App">
        <SearchBar
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          streamerInfo={this.state}
        />
        <TwitchLogo streamerInfo={this.state} />
        <Bio streamerInfo={this.state} />
      </div>
    );
  }
}
