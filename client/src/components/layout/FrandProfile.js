import React, { Component } from "react";
import Glitch from "../../img/Glitch_White_RGB.png";

export default class TwitchLogo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logoAnimation: "animated bounceIn",
      bioAnimation: "animated fadeInUp",
      streamer: "",
      logo: Glitch,
      bio:
        "Watch me do a make! Foam, electronics, 3D printing, sewing, etc. Also some gaming. Lots of swearing, usually."
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      streamer: event.target.value,
      logoAnimation: "bio animated bounceOut",
      bioAnimation: "animated fadeOutDown"
    });
  }

  handleSubmit(event) {
    this.setState({
      logo:
        "https://cdn.discordapp.com/attachments/473957043108184065/536016534959816714/Heart-Logo_Love-Making_Trans.png",
      logoAnimation: "animated bounceIn",
      bioAnimation: "bio animated fadeInUp"
    });
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <header className="App">
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              spellCheck="false"
              className="streamer-name-search"
              value={this.state.streamer}
              onChange={this.handleChange}
              placeholder="Enter a streamer's name here"
            />
            <input type="submit" value="Submit" className="hidden" />
          </form>
          <img
            src={this.state.logo}
            className={"logo " + this.state.logoAnimation}
            alt={this.state.streamer + "'s logo"}
          />
          <div className={"bio " + this.state.bioAnimation}>
            <p>{this.state.bio}</p>
          </div>
        </header>
      </div>
    );
  }
}
