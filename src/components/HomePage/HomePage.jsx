import React, { Component } from 'react';
import Search from '../Search';
import { getSongs } from '../SongQueue/SQueueActions'

class HomePage extends Component {
	constructor() {
		super();
	}

	componentDidMount() {
	const { dispatch, queueId } = this.props;
	dispatch(getSongs(queueId));
	}

	render() {
		const { songs } = this.props
		return (
			<section id='main'>
				<h1 className='glitch' data-text='SPACEBOX'>SPACEBOX</h1>
				<div className='search-component-container'>
					<Search />
				</div>
				<section className='playlist'>
					{songs.map((song, index) => {
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
				</section>
			</section>
		);
	}
}

export default HomePage;
