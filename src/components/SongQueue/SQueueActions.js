const axios = require('axios');

export const getSongs = (queueId) => ({
    type: 'GET_SONGS',
    payload: axios.get(`/api/Queues/${queueId}/songs`)
        .then(response => response.data)
})
export const deleteSong = (queueId, songId) => ({
    type: 'DELETE_SONG',
    payload: axios.delete(`/api/Queues/${queueId}/songs/${songId}`)
})
export function updateSongs(songs) {
    return {
      type: 'UPDATE_SONGS',
      payload: songs
    };
  }
