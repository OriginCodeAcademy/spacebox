'use strict';
const { getSong } = require('../../server/utils/song');
const { getMoreMusicFromSpotify} = require('../../server/utils/getMoreFromSpotify');

module.exports = function(Song) {
  Song.getTrackData = function(songUri, userID, cb) {
    getSong(songUri, userID)
    .then(song => cb(null, song))
  }

  Song.remoteMethod('getTrackData', {
        accepts: [{arg: 'songUri', type: 'string'},{arg: 'userID', type:'string'}],
        returns: {arg: 'song', type: 'object'}
  });

  Song.getMoreFromSpotify = function(userId, query, types, cb) {
    getMoreMusicFromSpotify(userId, query, types)
      .then((songs) => cb(null, songs))
      .catch(err => cb(err))
  }
  
  Song.remoteMethod('getMoreFromSpotify', {
    description: 'Searchs for spotify songs',
    accepts: [{arg: 'userId', type: 'string'}, {arg: 'query', type: 'string'}, {arg: 'types', type: 'array'}],
    http: { path: '/getMoreFromSpotify', verb: 'get'},
    returns: {arg: 'data', type: 'array', root: true}
  })
};
