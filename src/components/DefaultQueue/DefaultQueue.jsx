import React, { Component } from 'react';
import { getDefaultQueue, getDefaultSongs, deleteDefaultSong, handleAddInput, addDefaultSong } from './DQueueActions'

export default class DefaultQueue extends Component {
  constructor(props) {
    super(props);
    
	  this.getDefaultSongs = this.getDefaultSongs.bind(this);
		this.handleAddInput = this.handleAddInput.bind(this);
    this.deleteDefaultSong = this.deleteDefaultSong.bind(this);
	  this.addDefaultSong = this.addDefaultSong.bind(this);    
  }

  componentDidMount() {
	  const { dispatch, userId } = this.props;
	  dispatch(getDefaultQueue(userId))
  }

  getDefaultSongs() {
	  const { dispatch, queueId } = this.props;
	  dispatch(getDefaultSongs(queueId))
	}
	
	deleteDefaultSong(event) {
		const { dispatch, queueId } = this.props;
		dispatch(deleteDefaultSong(event.target.name, queueId))
	}

	handleAddInput(event) {
		const { dispatch } = this.props;
		dispatch(handleAddInput(event.target.value))
  }
  
  addDefaultSong() {
    const { dispatch, inputValue } = this.props;
    dispatch(addDefaultSong(inputValue))
  }

  render() {
    const { defaultSongs } = this.props;
    return (
      <div id='default-queue' className='queue-container'>
        <h4 className='queue-header'>Comfort Music</h4>
        <button onClick={this.getDefaultSongs}>Get Default Songs</button>
        <ul className='queue-list'>
          {
            defaultSongs.map(song => {
              return (
                <li key={song.id} className='queue-item'>
                  <div className='list-item-container'>
                    <div className='track-title track-info'>{song.name}</div>
                    <span className='track-artist track-info'>{song.artist}</span>
                    <span className='separator track-info'> • </span>
                    <button name={song.id} onClick={this.deleteDefaultSong}>Delete</button>
                  </div>
                  <div className='track-length'>{song.duration}</div>
                </li>
              )
            })
          }
        </ul>
        <input placeholder='spotify:track:URI' onChange={this.handleAddInput} />
        <button onClick={this.addDefaultSong}>Add</button>
      </div>
    )
  }
}
