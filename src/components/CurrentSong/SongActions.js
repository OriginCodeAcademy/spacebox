const axios = require('axios');

export const togglePlay = () => ({
  type: 'TOGGLE_PLAY',
  payload: axios.get('/song/toggle')
});
