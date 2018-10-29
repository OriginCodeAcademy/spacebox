import React, { Component } from 'react';

export default class SongQueue extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className='queue-container container'>
        <h4>Coming Up Next...</h4>
        <ul>
          <li>
            <h6>Song Title</h6>
            <p>Artist</p>
          </li>
        </ul>
      </div>
    )
  }
}
