const initialState = {
  song: '',
  playing: false
}

function PlayBtnReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case 'TOGGLE_PLAYING_FULFILLED': {
      return state;
    }
    default: {
      return state;
    }
  }
}
