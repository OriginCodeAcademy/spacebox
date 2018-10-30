'use strict';

export function updateRoomTracks(queueId) {
  return {
    type: 'UPDATE_ROOM_TRACKS',
    payload: queueId
  };
}