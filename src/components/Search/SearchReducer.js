const initalstate = {
	uri: "",
	disableButton: false,

};

function SearchReducer(state = initalstate, action) {
	const { type, payload } = action;
	switch (type) {
		case 'UPDATE_URI':
			return {
				...state,
				uri: payload
			}
		case 'TOGGLE_DISABLE_BUTTON':
			return {
				...state,
				uri: payload
			}
		default:
			return {
				...state
			}
	}
}
export default SearchReducer;