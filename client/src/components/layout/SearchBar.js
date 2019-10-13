import React, { Component } from "react";

export default class SearchBar extends Component {
  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <input
          type="text"
          spellCheck="false"
          className="streamer-name-search"
          value={this.props.streamerInfo.streamer}
          onChange={this.props.handleChange}
          placeholder="Enter a streamer's name here"
        />
        <input type="submit" value="Submit" className="hidden" />
      </form>
    );
  }
}
