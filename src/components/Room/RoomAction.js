'use strict';

export function updateRoom(queueId) {
  return {
    type: 'UPDATE_ROOM',
    payload: queueId
  };
}