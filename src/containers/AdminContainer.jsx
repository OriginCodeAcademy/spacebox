import React, { Component } from 'react';
import DefaultQueue from '../components/DefaultQueue';
import CurrentSong from '../components/CurrentSong';
import SongQueue from '../components/SongQueue';

export default class AdminContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id='dashboard-container' className='container'>
        <h1 id='dashboard-title' data-text='DASHBOARD' className='glitch'>
          DASHBOARD
        </h1>
        <CurrentSong />
        <DefaultQueue />
        <SongQueue />
      </div>
    )
  }
}
