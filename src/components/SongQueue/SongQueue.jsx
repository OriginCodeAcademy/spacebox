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
            <div>Song Title</div>
            <div>Artist Name</div>
            <div>Album Name</div>
          </li>
          <li className='queue-item'>
            <h5>Song Title</h5>
            <div>Artist Name</div>
            <div>Album Name</div>
          </li>
        </ul>
      </div>
    )
  }
}
