import axios from 'axios';
import React, { Component } from 'react';
<<<<<<< HEAD
import { updateSearchType, updateSearch, getSearch } from './SearchAction';
=======
import { updateQuery, dbSearch, spotifySearch, updateType, addToQueue } from './SearchAction';
//import { getSong } from '../../../server/utils/song';

>>>>>>> finished the db query and mapping out the results. currently working the functionality of two buttons to add the uri to the queue
class Search extends Component {
	constructor(props) {
		super(props);
		this.handleSpotifyCall     = this.handleSpotifyCall.bind(this);
		this.handleSelect          = this.handleSelect.bind(this);
		this.handleQuery           = this.handleQuery.bind(this);
		this.handleDbSearch        = this.handleDbSearch.bind(this);
		this.handleSelectedSongUri = this.handleSelectedSongUri.bind(this);


	}

	handleSelect(event) {
		console.log('handle select');
		const { dispatch } = this.props;
		const { value }    = event.target;
		dispatch(updateType( value ));
	}

	handleQuery(event) {
		console.log('handle query');
		const { dispatch } = this.props;
		const { value }    = event.target;
		dispatch(updateQuery( value ));
	}
	
		handleDbSearch(e) {
			console.log('handleDbSearch');
			const { dispatch, query, type } = this.props;
			console.log('inside handle', type);
			dispatch(dbSearch(type, query));
		}
		
		handleSelectedSongUri(e) {
			console.log('inside if handle selected song uri');
			const { dispatch } = this.props;
			var uri = e.target.name
			console.log('this is uri: ', uri);
			var userId = '5bd9d108ef79ae228379334a';
			dispatch(addToQueue(uri, userId))
 		}

	  handleSpotifyCall() {
		console.log('axios call hit');
		const { dispatch, type, query } = this.props;
		dispatch(spotifySearch(type, query));

		}

	render() {
		console.log('this is data: ', this.props.data)
		return (
			<div>
			<div className="request">
				<select className = "dropdown" name = "query-select" id = "query-select" placeholder="Select By:"  onChange = {this.handleSelect}>
				<option className = "drop" id = "default-option" background = "rgba(100, 100, 100, 0.3)" >Search By:</option>
				<option className = "drop" id = "song-option" background = "rgba(100, 100, 100, 0.3)" value = "name">Song</option>
				<option className = "drop" id = "artist-option" value = "artist">Artist</option>
				</select>
			
				<input className = "input" type="text" placeholder = "Enter song or artist name" name="query" onChange = {this.handleQuery} value={this.props.query} />
				<button className = "button" onClick = {this.handleDbSearch} disabled = {this.props.disabled}>Search</button>
			</div>
	
				{(this.props.data) &&
					this.props.data.map((listItem, index) => {
					return <div className="main-flex">
							<div className="artist-name">
								<strong>Artist: {listItem.artist}</strong>
							</div>
							<div className="song-name">
								<strong className="song-name">Song: {listItem.name}</strong>
							</div>
							<button name={listItem.uri} className="button" id="addToQueue" role="button" onClick={this.handleSelectedSong}>Add Song</button>
						</div>
					
					})
				}
					<button className = "button" id="spotify-btn" role="button">More Songs</button>
		</div>
		)}
	
}
	
export default Search;

