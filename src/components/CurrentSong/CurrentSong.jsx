import React, { Component } from 'react';
import { startPlayback, pausePlayback, togglePlaying } from './SongActions';

export default class CurrentSong extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false
    }
    this.handleBtn = this.handleBtn.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    let playing = false;
    dispatch(togglePlaying(playing));
    dispatch(startPlayback());
  }

  handleBtn(e) {
    e.preventDefault();
    const { playing, dispatch, queueId } = this.props;
    const id = '5bd9fcb423fa342511b95f08';
    dispatch(togglePlaying(playing));
    playing ? dispatch(pausePlayback(id)) : dispatch(startPlayback(id));
  }

  render() {

    const { playing } = this.props;

    return (
      <div id='current-track' className='container'>
        <div id='play-btn-circle'>
          {
            (playing) ? <div className='press-pause' onClick={this.handleBtn}></div> : <div className='press-play' onClick={this.handleBtn}></div>
          }
        </div>
      </div>
    )
  }
}
