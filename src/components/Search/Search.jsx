import axios from 'axios';
import React, { Component } from 'react';

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

	render() {
		return (
			<div className="request">
				<input type="text" placeholder="spotify:track:URI" name="uri" /* onChange={this.getUri} value={this.props.uri} */ />
				<button name="button" /* onClick={this.handleSearch} disabled={this.props.disabled} */ >Add Song</button>
				<div className='col-12'>
					<p> AUSTIN's ALERT MESSAGE SPACE </p>
				</div>
			</div>
		)
	}
}
export default Search;