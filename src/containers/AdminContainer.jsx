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
				<DefaultQueue />
				<CurrentSong />
				<SongQueue />
			</div>
		)
	}
}

