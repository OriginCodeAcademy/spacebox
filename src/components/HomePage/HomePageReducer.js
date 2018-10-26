const initalstate = {
	songs: [],
};

function HomePageReducer(state = initalstate, action) {
	const { type, payload } = action;
	switch (type) {
		case 'UPDATE_SONGS':
			return {
				...state,
				songs: payload
			}
		default:
			return {
				...state
			}
	}
};

export default HomePageReducer;