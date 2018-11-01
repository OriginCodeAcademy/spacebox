import React, { Component } from 'react';
import { updateQuery, dbSearch, spotifySearch, updateType, addToQueue } from './SearchAction';

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
		const { dispatch } = this.props;
		const { value }    = event.target;
		dispatch(updateType( value ));
	}
	
	handleQuery(event) {
		const { dispatch } = this.props;
		const { value }    = event.target;
		dispatch(updateQuery( value ));
	}
	
	handleDbSearch(e) {
		const { dispatch, query, type } = this.props;
		dispatch(dbSearch(type, query));
	}
	
	handleSelectedSongUri(e) {
		const { match: { params } } = this.props;
		const { dispatch, userId } = this.props;
		var uri = e.target.name
		dispatch(addToQueue(uri, userId, queueId))
		dispatch({ type: "UPDATE_DATA", payload: []})
		dispatch({ type: "GET_SONGS", payload: params.queueId })
 	}

	handleSpotifyCall() {
		const { dispatch, userId, query } = this.props;
		var type = 'track'
		dispatch({ type: "UPDATE_TYPE" })
		dispatch(spotifySearch(type, query, userId));
	}

	render() {
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
					return <div className="main-flex" key = {index}>
							<div className="artist-name">
								<strong>Artist: {listItem.artist}</strong>
							</div>
							<div className="song-name">
								<strong className="song-name">Song: {listItem.name}</strong>
							</div>
							<button name={listItem.uri} className="button" id="addToQueue" role="button" onClick={this.handleSelectedSongUri}>Add Song</button>
						</div>
					
					})
				}
					<button className = "button" id="spotify-btn" onClick={this.handleSpotifyCall}role="button">More Songs</button>
		</div>
		)}
	
}
	
export default Search;
