const axios = require('axios');

export const togglePlay = (song) => ({
  type: 'TOGGLE_PLAY',
  payload: axios.get(`CurrentSong/toggle/${song}`)
})
