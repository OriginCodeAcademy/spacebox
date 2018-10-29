const axios = require('axios');

export const deleteSong = (song) => ({
  type: 'REMOVE_SONG',
  payload: axios.get(`/dQueue/remove/${song}`)
});
