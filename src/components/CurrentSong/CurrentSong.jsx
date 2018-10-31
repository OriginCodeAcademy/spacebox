import React, { Component } from 'react';
import { startPlayback, pausePlayback, togglePlaying } from './SongActions';

export default class CurrentSong extends Component {
  constructor(props) {
    super(props);

    this.handleBtn = this.handleBtn.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    let playing = false;
    dispatch(togglePlaying(playing))
    dispatch(startPlayback());
  }

  handleBtn(e) {
    e.preventDefault();
    const { playing, dispatch } = this.props;
    playing ? dispatch(pausePlayback()) : dispatch(startPlayback());
  }

  render() {

    const { playing } = this.props;

    return (
      <div id='current-track' className='container'>
        <div id='play-btn'>
          <div id='play-triangle'></div>
        </div>
      </div>
    )
  }
}
