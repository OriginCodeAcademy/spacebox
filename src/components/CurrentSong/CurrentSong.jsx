import React, { Component } from 'react';

export default class CurrentSong extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { song } = this.props;
    const duration = song.duration_ms / 1000;

    return (
      <div id='song-container' className='container'>
        Song
			</div>
    )
  }
}
