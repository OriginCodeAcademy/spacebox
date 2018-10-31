const app = require('../server');
const SpotifyWebApi = require('spotify-web-api-node');
const { getAccessToken } = require('../../server/utils/playlist');

function playCurrentSong(id) {
  const { Queue, User } = app.models;
  return new Promise((resolve, reject) => {
    Queue.findById(id)
      .then(queue => {
        var userID = queue.userId;
        // takes the userID from the queue and gets spotifyID and playlistID from that user
        User.findById(userID)
          .then((user) => {
            var spotifyID = user.spotifyID
            var playlistID = user.playlistID
            getAccessToken(user.id)
              .then(accessToken => {
                const spotifyApi = new SpotifyWebApi({ accessToken });
                spotifyApi.getMyCurrentPlayingTrack()
                  .then(response => {
                    console.log('response', response);
                    const songCurrentlyPlaying = response.body.item;
                    const isJukeboxOn = response.body.is_playing;
                    spotifyApi.play({
                      context_uri: `spotify:user:${spotifyID}:playlist:${playlistID}`,
                      offset: {
                        position: 0
                      }
                    })
                      .catch(err => reject(err));
                  })
                  .catch(err => reject(err));
              })
              .catch(err => reject(err));
          })
          .catch(err => reject(err));
      })
      .catch(err => reject(err));
  })
}

function playCurrentSong(id) {
  const { Queue, User } = app.models;
  return new Promise((resolve, reject) => {
    Queue.findById(id)
      .then(queue => {
        var userID = queue.userId;
        // takes the userID from the queue and gets spotifyID and playlistID from that user
        User.findById(userID)
          .then((user) => {
            var spotifyID = user.spotifyID
            var playlistID = user.playlistID
            getAccessToken(user.id)
              .then(accessToken => {
                const spotifyApi = new SpotifyWebApi({ accessToken });
                spotifyApi.getMyCurrentPlayingTrack()
                  .then(response => {
                    console.log('response', response);
                    const songCurrentlyPlaying = response.body.item;
                    const isJukeboxOn = response.body.is_playing;
                    spotifyApi.play({
                      context_uri: `spotify:user:${spotifyID}:playlist:${playlistID}`,
                      offset: {
                        position: 0
                      }
                    })
                      .catch(err => reject(err));
                  })
                  .catch(err => reject(err));
              })
              .catch(err => reject(err));
          })
          .catch(err => reject(err));
      })
      .catch(err => reject(err));
  })
}

module.exports = { playCurrentSong };

// Take QueueID
// Get user
// Use playlist ID + Spotify ID
// Get current playing song
// Pause/play current playing song
