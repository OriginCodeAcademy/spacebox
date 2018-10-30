import React, { Component } from 'react';
import Room from '../components/Room/index';

export default class RoomContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='container' >
        <Room />
      </div>
    )
  }
}