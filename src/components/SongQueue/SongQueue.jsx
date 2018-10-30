import React, { Component } from 'react';

export default class SongQueue extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div id='song-queue' className='queue-container'>
        <h4 className='queue-header'>Coming Up Next...</h4>
        <ul className='queue-list'>
          <li className='queue-item'>
            <div className='list-item-container'>
              <div className='track-title'>Song Title</div>
              <span className='track-artist'>Artist Name</span>
              <span className='separator'> • </span>
              <span className='track-album'>Album Name</span>
            </div>
            <div className='track-length'>0:00</div>
          </li>
        </ul>
      </div>
    )
  }
}
