const app = require('../server');
const SpotifyWebApi = require('spotify-web-api-node');
import

  function pauseCurrentSong(id) {
    const { Queue } = app.models;
    return new Promise((resolve, reject) => {
      Queue.findByid(id)
        .then(queue => {
          resolve(queue);
        })
        .catch(err => {
          reject(err);
        })
    })
  }

// Take QueueID
// Get user
// Use playlist ID + Spotify ID
// Get current playing song
// Pause/play current playing song
