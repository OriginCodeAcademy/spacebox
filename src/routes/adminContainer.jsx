import React, { Component } from 'react';
import defaultQueue from '../components/defaultQueue';
import playingSong from '../components/playingSong';
import songQueue from '../components/songQueue';

export default class Dashboard extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className='container'>
				<playingSong >This is the Playing Song</playingSong>
				<defaultQueue>This is the default queue</defaultQueue>
				<songQueue>This is the song queue</songQueue>
			</div>
		)
	}
}

