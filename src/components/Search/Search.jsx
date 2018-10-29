import axios from 'axios';
import React, { Component } from 'react';
import { updateSearchType, updateSearch, getSearch } from './SearchAction';
class Search extends Component {
	constructor(props) {
		super(props);
		// this.getUri = this.getUri.bind(this);
		// this.handleSearch = this.handleSearch.bind(this);
	}

	// getUri(e) {
	// 	const { dispatch } = this.props
	// 	dispatch({ type: 'UPDATE_URI', payload: e.target.value });
	// }

	// handleSearch() {
	// 	this.setState({ disabled: true });
	// 	axios.post('/api/request', { uri: this.props.uri })
	// 		.then(res => {
	// 			if (res.data.error) return alert(res.data.error);
	// 			return res.data;
	// 		})
	// 		.then(() =>
	// 			dispatch({ type: 'TOGGLE_DISABLE_BUTTON', payload: true })
	// 				.catch(err => {
	// 					alert(err.message);
	// 					dispatch({ type: 'TOGGLE_DISABLE_BUTTON', payload: true });
	// 				}));
	// }

	handleArtist(event) {
		const { dispatch } = this.props;
		dispatch(updateInput(event.target.value));
	  }
	
	  handleButtonLine(cityName) {
		console.log('axios function hit');
		const { dispatch } = this.props;
		dispatch(handleApiCall(cityName));
	  }
	
	  handleApiCall() {
		console.log('axios call hit');
		const { dispatch, Artist } = this.props;

	render() {
        const { searchType, searchStr } = this.props;
		return (
			<div>
			<div className="request">
				<select className="dropdown" name="querySelect" id="querySelect" placeholder="Select By:">
				<option className="drop" background= "rgba(100, 100, 100, 0.3)" value="">Song</option>
				<option className="drop" value="">Artist</option>
				<option className="drop" value="">URI</option>
				</select>
			
				<input className="input" type="text" placeholder="spotify:track:URI" name="uri" onChange={this.getUri} value={this.props.uri} />
				<button name="button" onClick={this.handleSearch} disabled={this.props.disabled}>Search</button>
			</div>
			<div>
				<p>AUSTINS ALERT MESSAGE GOES HERE</p>
			</div>
		
			</div>
		)
	}
}
export default Search;