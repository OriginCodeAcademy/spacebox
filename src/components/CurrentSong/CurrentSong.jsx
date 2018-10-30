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
      <div id='current-song' className='container'>
        <div>Song Name, Artist</div>
        <div>Song Length</div>
        <div>progress bar</div>
        <div>Play Button</div>
      </div>
    )
  }
}
