import React, { Component } from 'react';

export default class DefaultQueue extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div className='container queue-container'>
        <ul id='default-queue-list'>
          <li id='default-queue-item'>
            <div>Song Title</div>
            <div>Artist Name</div>
            <div>Album Name</div>
          </li>
          <li id='default-queue-item'>
            <div>Song Title</div>
            <div>Artist Name</div>
            <div>Album Name</div>
          </li>
        </ul>
      </div >
    )
  }
}
