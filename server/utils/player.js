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
                    const songCurrentlyPlaying = response.body.item;
                    const isJukeboxOn = response.body.is_playing;
                    spotifyApi.play({
                      context_uri: `spotify:playlist:${playlistID}`,
                      offset: {
                        position: 0
                      }
                    })
                      .then(() => resolve({ message: "Jukebox is on!" }))
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

function pauseCurrentSong(id) {
  const { Queue, User } = app.models;
  return new Promise((resolve, reject) => {
    Queue.findById(id)
      .then(queue => {
        var userID = queue.userId;
        User.findById(userID)
          .then((user) => {
            var playlistID = user.playlistID
            getAccessToken(user.id)
              .then(accessToken => {
                const spotifyApi = new SpotifyWebApi({ accessToken });
                spotifyApi.getMyCurrentPlayingTrack()
                  .then(() => {
                    spotifyApi.pause({
                      context_uri: `spotify:playlist:${playlistID}`,
                      offset: {
                        position: 0
                      }
                    })
                      .then(() => resolve({ message: "Jukebox is on!" }))
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

module.exports = { playCurrentSong, pauseCurrentSong };
