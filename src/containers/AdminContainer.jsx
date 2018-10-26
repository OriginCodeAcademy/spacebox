import React, { Component } from 'react';
import defaultQueue from '../components/DefaultQueue';
import playingSong from '../components/CurrentSong';
import songQueue from '../components/SongQueue';

export default class AdminContainer extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className='container'>
			<defaultQueue />
				<playingSong />
				<songQueue />
				<Queue />
			</div>
		)
	}
}

