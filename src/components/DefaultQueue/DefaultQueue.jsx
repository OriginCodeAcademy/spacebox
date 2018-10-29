import React, { Component } from 'react';

export default class DefaultQueue extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div id='default-queue' className='queue-container'>
        <h4 className='queue-header'>Comfort Music</h4>
        <ul className='queue-list'>
          <li className='queue-item'>
            <div className='list-item-container'>
              <div className='track-title'>Song Title</div>
              <div className='artist-name'>Artist Name</div>
              <div className='album-name'>Album Name</div>
            </div>
            <div className='track-length'>0:00</div>
          </li>
        </ul>
      </div >
    )
  }
}
