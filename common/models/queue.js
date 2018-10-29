'use strict';
const { getPlaylist, updatePlaylist } = require('../../server/utils/playlist')

module.exports = function (Queue) {
    Queue.getPlaylist = function (id, cb) {
        getPlaylist(id)
            .then((tracks) => cb(null, tracks))
            .catch(err => cb(err));
    }

    Queue.remoteMethod('getPlaylist', {
        description: 'Gets current playlist from Spotify',
        accepts: {
            arg: 'id',
            type: 'string'
        },
        http: {
            path: '/getPlaylist',
            verb: 'get'
        },
        returns: {
            arg: 'data',
            type: 'array',
            root: true
        },
    });

    Queue.updatePlaylist = function (id, songID, cb) {
        updatePlaylist(id, songID)
            .then((tracks) => cb(null, tracks))
            .catch(err => cb(err));
    }



    Queue.remoteMethod('updatePlaylist', {
        description: 'Adds new song to playlist and removes current playing song from playlist. Adds default songs if needed.',
        accepts: [{
            arg: 'id',
            type: 'string'
        },
        {
            arg: 'songID',
            type: 'string'
        }],
        http: {
            path: '/updatePlaylist',
            verb: 'get'
        },
        returns: {
            arg: 'data',
            type: 'array',
            root: true
        },
    });
};
