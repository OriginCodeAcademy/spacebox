const axios = require('axios');

export const togglePlaying = (playing) => ({
  type: 'TOGGLE_PLAYBACK',
  payload: !playing
});

export const startPlayback = (queueId) => ({
  type: 'START_PLAYBACK',
  payload: axios.get(`/api/Queues/playCurrentSong?id=${queueId}`).then(response => response.data.message)
});

export const pausePlayback = (queueId) => ({
  type: 'PAUSE_PLAYBACK',
  payload: axios.get(`/api/Queues/pauseCurrentSong?id=${queueId}`)
});
