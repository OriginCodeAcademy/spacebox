'use strict';
const initialState = {
  queueId: '',
};

function RoomReducer(state = initialState, action) {
  const {type, payload} = action;
  switch (type) {
    case 'UPDATE_ROOM':
      return {
        ...state,
        queueId: payload
      };
    default:
      return state;
  }
}