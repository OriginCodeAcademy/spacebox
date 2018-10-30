'use strict';
const initialState = {
  queueId: '',
};

export default function RoomReducer(state = initialState, action) {
  const {type, payload} = action;
  switch (type) {
    case 'UPDATE_ROOM_TRACKS':
      return {
        ...state,
        queueId: payload
      };
    default:
      return state;
  }
}