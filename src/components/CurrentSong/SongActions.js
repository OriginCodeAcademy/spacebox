const axios = require('axios');

export const updateSongInfo = () => ({
  type: 'UPDATE_SONG_INFO',
  payload: axios.get('/v1/me/player/currently-playing')
    .then(response => response)
})

export const togglePlaying = (playing) => ({
  type: 'TOGGLE_PLAYBACK',
  payload: !playing
});

export const startPlayback = (queueId) => ({
  type: 'START_PLAYBACK',
  payload: axios.get(`/api/Queues/playCurrentSong?id=${queueId}`)
});

export const pausePlayback = (queueId) => ({
  type: 'PAUSE_PLAYBACK',
  payload: axios.get(`/api/Queues/pauseCurrentSong?id=${queueId}`)
});
