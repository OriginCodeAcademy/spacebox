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
      <div className='container'>
        <h1 id='dashboard-title' className='glitch'>
        ::before
        DASHBOARD
        ::after
        </h1>
        <CurrentSong id='current-song' />
        <DefaultQueue id='default-queue' />
        <SongQueue id='song-queue' />
      </div>
    )
  }
}

