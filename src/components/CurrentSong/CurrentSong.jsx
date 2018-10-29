import React, { Component } from 'react';

export default class CurrentSong extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		// const { song } = this.props;
		// const duration = song.duration_ms / 1000;

		return (
			<div className='container'>
				<div>Song Length</div>
				{/* <img src={song.albumCover} /> */}
				{/* <h2>{song.name}</h2> */}
				{/* <h3>{song.artist}</h3> */}
				{/* <progress value='0' max='100'></progress> */}
			</div >
		)
	}
}
