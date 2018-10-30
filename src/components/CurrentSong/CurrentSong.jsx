import React, { Component } from 'react';
import { togglePlay } from './SongActions';

export default class CurrentSong extends Component {
  constructor(props) {
    super(props);

    this.handleBtn = this.handleBtn.bind(this);
  }

  handleBtn(e) {
    e.preventDefault();
    const { song, playing, dispatch } = this.props;
    dispatch(togglePlay(playingSong))
  }

  render() {
    return (
      <div id='current-track' className='container'>
        <div id='play-btn'>
          <div id='play-triangle'></div>
        </div>
      </div>
    )
  }
}
