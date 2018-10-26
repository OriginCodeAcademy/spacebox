'use strict';

module.exports = function (Queue) {
    // queue.getPlaylist = function (id, cb) {
    //     // finds the correct queue if there are mutliple
    //     queue.find({
    //         where: {
    //             id: id
    //         }
    //     })
    //         .then((queue) => {
    //             spotifyApi.getPlaylist(process.env.SPOTIFY_USER, process.env.SPOTIFY_PLAYLIST)
    //                 .then(data => {
    //                     if (queue.songs.length !== 0) {
    //                         const playlistInfo = {
    //                             url: data.body.external_urls.spotify,
    //                             image: data.body.images[0].url,
    //                             tracks: data.body.tracks.items.map(i => formatSong(i.track))
    //                         }
    //                         cb(null, playlistInfo.tracks)
    //                     }
    //                     else cb(null, [])
    //                 })
    //                 .catch(err => console.log(err));
    //         })
    //         .catch(err => console.log(err));
    // }

    // queue.remoteMethod('getPlaylist', {
    //     description: 'Gets current playlist from Spotify before.',
    //     accepts: {
    //         arg: 'id',
    //         type: 'string'
    //     },
    //     http: {
    //         path: '/getPlaylist',
    //         verb: 'get'
    //     },
    //     returns: {
    //         arg: 'data',
    //         type: 'array',
    //         root: true
    //     },
    // });


    // queue.updatePlaylist = async function (id, cb) {
    //     queue.find({
    //         where: {
    //             id: id
    //         }
    //     })
    //         .then((queue) => {
    //             let { songs } = queue
    //             spotifyApi.getMyCurrentPlayingTrack()
    //                 .then(response => {
    //                     const songCurrentlyPlaying = response.body.item;
    //                     const isJukeboxOn = response.body.is_playing;

    //                     if (songs[0].uri === songCurrentlyPlaying.uri) {
    //                         lastPlayed = songs[0];
    //                         songs.shift();
    //                     }
    //                     else if (songs[0].uri !== songCurrentlyPlaying.uri && lastPlayed.uri !== songCurrentlyPlaying.uri) {
    //                         // Make song list match currently playing
    //                         while (songs.length && songs[0].uri !== songCurrentlyPlaying.uri)
    //                             songs.shift();
    //                     }
    //                     // If new songs to add
    //                     if (songToAdd) songs.push(songToAdd);

    //                     // If last song and no longer playing ? add default songs.
    //                     if (songs.length === 1) {
    //                         songs.push(...defaultSongs.filter(s => s.uri !== songCurrentlyPlaying.uri));
    //                     }

    //                     let tracks = [...songs].map(s => s.uri);

    //                     spotifyApi.replaceTracksInPlaylist(process.env.SPOTIFY_USER, process.env.SPOTIFY_PLAYLIST, tracks)
    //                         .then(() => {
    //                             if (!isJukeboxOn) {
    //                                 setTimeout(() => {
    //                                     spotifyApi.play({
    //                                         context_uri: `spotify:user:${process.env.SPOTIFY_USER}:playlist:${process.env.SPOTIFY_PLAYLIST}`,
    //                                         offset: {
    //                                             position: 1
    //                                         }
    //                                     })
    //                                         .catch(err => console.log(err))
    //                                 }, 5000);
    //                             }

    //                             if (lastPlayed.uri === songCurrentlyPlaying.uri) songs.unshift(lastPlayed);
    //                             io.emit('update', songs);
    //                             cb(null, songs);
    //                         })
    //                         .catch(err => ({ error: 'We couldn\'t add your song for some reason. Try again!', err }));
    //                 })
    //                 .catch(err => ({ error: 'SPACEBOX is turned off. Tell an instructor!', err }))
    //         }
    //         )
    // }

    // queue.remoteMethod('updatePlaylist', {
    //     description: 'Adds new song to playlist and removes current playing song from playlist. Adds default songs if needed.',
    //     accepts: {
    //         arg: 'id',
    //         type: 'string'
    //     },
    //     http: {
    //         path: '/updatePlaylist',
    //         verb: 'get'
    //     },
    //     returns: {
    //         arg: 'data',
    //         type: 'array',
    //         root: true
    //     },
    // });
};
