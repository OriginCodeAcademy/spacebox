'use strict';
const initialState = {
  queueId: '',
};

<<<<<<< HEAD
export default function RoomReducer(state = initialState, action) {
  const {type, payload} = action;
  switch (type) {
    case 'UPDATE_ROOM_TRACKS':
=======
function RoomReducer(state = initialState, action) {
  const {type, payload} = action;
  switch (type) {
    case 'UPDATE_ROOM':
>>>>>>> Added socket.io
      return {
        ...state,
        queueId: payload
      };
    default:
      return state;
  }
}