'use strict';

export function updateSongs(songs) {
  return {
    type: 'UPDATE_ROOM_TRACKS',
    payload: songs
  };
}
