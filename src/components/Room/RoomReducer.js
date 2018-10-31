'use strict';
const initialState = {
  queueId: '',
  messageList: []
};

export default function RoomReducer(state = initialState, action) {
  const {type, payload} = action;
  switch (type) {
    case 'UPDATE_ROOM_TRACKS':
      return {
        ...state,
        queueId: payload
      };
    case 'UPDATE_QUEUE':
      return {
        ...state,
        messageList: payload
      };
    default:
      return state;
  }
}