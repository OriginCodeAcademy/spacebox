'use strict';
const { getPlaylist, updatePlaylist } = require('../../server/utils/playlist');
const { addToDefaultSongs } = require('../../server/utils/adminQueue');

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
            .then((queue) => {
                Queue.replaceOrCreate(queue)
                cb(null, queue)
            })
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
            type: 'string',
            required: false
        }],
        http: {
            path: '/updatePlaylist',
            verb: 'put'
        },
        returns: {
            arg: 'data',
            type: 'array',
            root: true
        },
    });

    Queue.addToDefaultSongs = function (id, uri, cb) {
        addToDefaultSongs(id, uri)
            .then((queue) => {
                Queue.replaceOrCreate(queue)
                cb(null, queue)
            })
            .catch(err => cb(err));
    };

    Queue.remoteMethod('addToDefaultSongs', {
        description: 'Adds new song to default song array',
        accepts: [
        {
            arg: 'id',
            type: 'string'
        },
        {
            arg: 'uri',
            type: 'string'
        }],
        http: {
            path: '/addToDefaultSongs',
            verb: 'post'
        },
        returns: {
            arg: 'data',
            type: 'array',
            root: true
        },
    });

};

