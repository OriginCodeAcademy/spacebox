import axios from 'axios';
import React, { Component } from 'react';
import io from 'socket.io-client';
import Search from '../Search';
// const socket = io();

class HomePage extends Component {
	constructor() {
		super();
		// socket.on('update', songs =>
		// 	dispatch({ type: 'UPDATE_SONGS', payload: { songs } }));
	}

	// componentDidMount() {
	// 	axios.get('/api/playlist').then(response => {
	// 		if (response.data.error) return alert(response.data.error);
	// 		dispatch({ type: 'UPDATE_SONGS', payload: response.data });
	// 	});
	// }

	render() {
		return (
			<section id='main'>
				<h1 className='glitch' data-text='SPACEBOX'>SPACEBOX</h1>
				<div className='search-component-container'>
					<Search />
				</div>
				{/* <section className='playlist'>
					{this.props.songs.map((song, index) => {
						if (index < 3) {
							return (
								<div className={index === 0 ? 'currently-playing' : 'up-next'}>
									<img src={song.albumCover} />
									<div className='song-info'>
										{index === 0 && <p> Recently Playing</p>}
										<h2>{song.name}</h2>
										<h3>{song.artist}</h3>
									</div>
								</div>
							)
						}
						return (
							<li className='queue' key={song.id}>{song.name}</li>
						)
					})}
				</section> */}
			</section>
		);
	}
}

export default HomePage;