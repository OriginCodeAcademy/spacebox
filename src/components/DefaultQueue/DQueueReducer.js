const initialState = {
  queue: []
};

function DQueueReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case 'REMOVE_SONG_FULFILLED': {
      return state;
    }
    default: {
      return state;
    }
  }
}
