const initialState = {
	disableButton	: false,
	data            : [],
	error           : '',
	query           : '',
	type            : '',

};

function SearchReducer(state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case 'TOGGLE_DISABLE_BUTTON':
			return {
				...state,
				disableButton: payload
			}
			case 'UPDATE_SEARCH_BY_TYPE':
			return {
				...state,
				type: payload
			}
			case 'UPDATE_DATA':
			return {
				...state,
				data: payload
			}
			case 'DB_SEARCH_FULFILLED':
			return {
				...state,
				data: payload
			}
			case 'DB_SEARCH_REJECTED':
			return {
				...state,
				error: 'The song or artist you are looking for is not in our database.'
			}
			case 'SPOTIFY_SEARCH_FULFILLED':
			return {
				...state,
				data: payload
			}
			case 'SPOTIFY_SEARCH_REJECTED':
			return {
				...state,
				error: 'The song or artist you are looking for was not found.'
			}
			case 'UPDATE_TYPE':
			return {
				...state,
				type: payload
			}
			case 'UPDATE_QUERY':
			return {
				...state,
				query: payload
			}
			case 'UPDATE_SELECTED_SONG_URI':
			return {
				...state,
				selectedSongUri: payload
			}
		default:
			return {
				...state
			}
	}
}
export default SearchReducer;
