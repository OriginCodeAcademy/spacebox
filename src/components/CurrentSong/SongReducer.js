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
    case 'TOGGLE_PLAY_FULFILLED':
      return {
        ...state,
        playing: payload
      }
  }
}
