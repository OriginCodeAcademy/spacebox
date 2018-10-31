import React, { Component } from 'react';
import { getSongs, deleteSong } from './SQueueActions';

export default class SongQueue extends Component {
  constructor(props) {
    super(props);

    this.getQueue = this.getQueue.bind(this);
    this.deleteSong = this.deleteSong.bind(this);
  }

  getQueue() {
    const {dispatch, queueId } = this.props;
    dispatch(getSongs(queueId))
  }

  deleteSong(event) {
    const { dispatch, queueId } = this.props;
    dispatch(deleteSong(queueId, event.target.name))
  }

  render() {
    const { songs } = this.props;
    return (
      <div id='song-queue' className='queue-container'>
        <h4 className='queue-header'>Coming Up Next...</h4>
        <button id='get-queue' onClick={this.getQueue}>Get Queue</button>
        <ul className='queue-list'>
        {
          songs.map(song => {
            return (
              <li key={song.id} className='queue-item'>
                <div className='list-item-container'>
                  <div className='track-title'>{song.name}</div>
                  <span className='track-artist'>{song.artist}</span>
                  <span className='separator'> • </span>
                  <button className='delete-song' name={song.id} onClick={this.deleteSong}>Delete</button>
                </div>
                <div className='track-length'>{song.duration}ms</div>
              </li>
            )
          })
        }
        </ul>
      </div>
    )
  }
}