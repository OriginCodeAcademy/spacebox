'use strict';

export function updateRoomTracks(queueId) {
  return {
    type: 'UPDATE_ROOM_TRACKS',
    payload: queueId
  };
}
export function updateMessages(messageList){
  return {
    type: 'UPDATE_MESSAGES',
    payload: messageList 
  };
}