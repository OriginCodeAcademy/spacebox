const initialState = {
    songs: [],
};

export default function queueReducer(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case 'GET_SONGS_FULFILLED': {
            return {
                ...state,
                songs: payload
            }
        }
        case 'UPDATE_SONGS':
        return {
            ...state,
            songs: payload
        }
        default:
            return {
                ...state,
            }
    }
}
