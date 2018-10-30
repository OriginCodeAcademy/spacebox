const initialState = {
  query: "",
};

function SearchReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case 'UPDATE_QUERY':
      return {
        ...state,
        query: payload
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
