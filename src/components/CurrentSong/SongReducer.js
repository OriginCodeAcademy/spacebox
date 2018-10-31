const initialState = {
  song: '',
  artist: '',
  album: '',
  length: 0,
  playing: false,
};

function SongReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case 'UPDATE_SONG_INFO_FULFILLED': {
      return {
        ...state,
        song: payload.item.name,
        artist: payload.item.album.artists.name,
        album: payload.item.album.name,
        length: item.duration_ms,
        playing: false
      }
    }
    case 'TOGGLE_PLAY': {
      return {
        ...state,
        playing: payload
      }
    }
    case 'START_PLAYBACK_FULFILLED': {
      return {
        ...state
      }
    }
    case 'PAUSE_PLAYBACK_FULFILLED': {
      return {
        ...state
      }
    }
    default: {
      return state;
    }
  }
}
