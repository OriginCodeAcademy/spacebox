'use strict';

<<<<<<< HEAD
export function updateRoomTracks(queueId) {
  return {
    type: 'UPDATE_ROOM_TRACKS',
=======
export function updateRoom(queueId) {
  return {
    type: 'UPDATE_ROOM',
>>>>>>> Added socket.io
    payload: queueId
  };
}