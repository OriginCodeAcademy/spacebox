import React, { Component } from 'react';
import { startPlayback, pausePlayback, togglePlaying } from './SongActions';

export default class CurrentSong extends Component {
  constructor(props) {
    super(props);

    this.handleBtn = this.handleBtn.bind(this);
  }

  // componentDidMount() {
  //   const { dispatch, playing } = this.props;
  //   dispatch(togglePlaying(playing));
  //   dispatch(startPlayback());
  // }

  handleBtn(e) {
    e.preventDefault();
    const { playing, dispatch, queueId } = this.props;
    dispatch(togglePlaying(playing));
    playing ? dispatch(pausePlayback(queueId)) : dispatch(startPlayback(queueId));
  }

  render() {

    const { playing } = this.props;

    return (
      <div id='current-track' className='container'>
        <div id='play-btn-circle'>
          {
            (playing) ? <div name='pause' className='play-pause press-pause' value={playing} onClick={this.handleBtn}></div> : <div name='play' className='play-pause press-play' value={playing} onClick={this.handleBtn}></div>
          }
        </div>
      </div>
    )
  }
}
