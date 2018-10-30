'use strict';
const { getSong } = require('../../server/utils/song');

module.exports = function(Song) {


  Song.getTrackData = function(songUri, userID, cb) {
    getSong(songUri, userID)
    .then(song => cb(null, song))
  }

  Song.remoteMethod('getTrackData', {
        accepts: [{arg: 'songUri', type: 'string'},{arg: 'userID', type:'string'}],
        returns: {arg: 'song', type: 'object'}
  });

};