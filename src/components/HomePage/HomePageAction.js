'use strict';

export function updateSongs(songs) {
  return {
    type: 'UPDATE_SONGS',
    payload: songs
  };
}
