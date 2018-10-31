const app = require('../server');
const axios = require('axios');
const SpotifyWebApi = require('spotify-web-api-node');
const {getSong} = require('../../server/utils/song');

function addToDefaultSongs(id, uri) {
  return new Promise((resolve, reject) => {
    const {Song, Queue} = app.models;
    Song.find({where: {uri: uri}})
    .then(song => {
      if (song[0]) {
        let songId = song[0].id;
        Queue.findById(id)
        .then(queue => {
          let defaultSongs = queue.defaultSongs;
          defaultSongs.push(songId);
          let updatedQueue = {
            'defaultSongs': defaultSongs,
            'id': id,
            'songIds': queue.songIds,
            'userId': queue.userId,
          };
          resolve(updatedQueue);
        })
        .catch(err => reject(err));
      } else {
        Queue.findById(id)
        .then(queue => {
          let userId = queue.userId;
          let defaultSongs = queue.defaultSongs;
          getSong(uri, userId)
          .then(song => {
            Song.find({where: {uri: uri}})
            .then(song => {
              let songId = song[0].id;
              Queue.findById(id)
              .then(queue => {
                let defaultSongs = queue.defaultSongs;
                defaultSongs.push(songId);
                let updatedQueue = {
                  'defaultSongs': defaultSongs,
                  'id': id,
                  'songIds': queue.songIds,
                  'userId': queue.userId,
                };
                resolve(updatedQueue);
              })
              .catch(err => reject(err));
            })
            .catch(err => reject(err));
          })
          .catch(err => reject(err));
        })
        .catch(err => reject(err));
      }
    })
    .catch(err => reject(err));
  });
}

module.exports = {addToDefaultSongs};
