const initialState = {
  queueId: '',
  defaultSongs: [],
  inputValue: ''
};

export default function dQueueReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case 'GET_DEFAULT_QUEUE_ID_FULFILLED': {
      return {
        ...state,
        queueId: payload
      }
    }
    case 'GET_DEFAULT_SONGS_FULFILLED': {
      return {
        ...state,
        defaultSongs: payload
      }
    }
    case 'GET_INPUT_VALUE': {
      return {
        ...state,
        inputValue: payload
      }
    }
    case 'ADD_DEFAULT_SONG_FULFILLED': {
      return {
        ...state,
        defaultSongs: payload
      }
    }
    default: {
      return state;
    }
  }
}
