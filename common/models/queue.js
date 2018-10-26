'use strict';

module.exports = function (Queue) {
    Queue.getPlaylist = function (id, cb) {
        var user = Queue.app.models.user;
        // finds the correct queue based on the queue ID that you put in
        Queue.findById(id, { fields: { userId: true } })
            .then((queue) => {
                var userID = queue.userId;
                // takes the userID from the queue and gets spotifyID and playlistID from that user
                user.findById(userID)
                    .then((user) => {
                        console.log(user.refreshToken)
                        const SpotifyWebApi = require('spotify-web-api-node');
                        const spotifyApi = new SpotifyWebApi({
                            clientId: process.env.SPOTIFY_CLIENT_ID,
                            clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
                            redirectUri: process.env.SITE_URL || 'http://localhost:8080',
                            refreshToken: user.refreshToken
                        });
                        var spotifyID = user.spotifyID
                        var playlistID = user.playlistID
                        spotifyApi.refreshAccessToken()
                            .then(data => {
                                // lastTime = new Date();
                                // lastTime.setSeconds(data.body.expires_in);
                                // accessToken = data.body['access_token'];
                                spotifyApi.setAccessToken(data.body['access_token']);
                                spotifyApi.getPlaylist(spotifyID, playlistID)
                                    .then(playlist => {
                                        const formatSong = track => ({
                                            id: track.id,
                                            name: track.name,
                                            artist: track.artists[0].name,
                                            albumCover: track.album.images[0].url,
                                            duration: track.duration_ms,
                                            uri: track.uri
                                          })
                                        var tracks = playlist.body.tracks.items.map(i => formatSong(i.track))
                                        cb(null, tracks);
                                    })
                                    .catch(err => cb(err));
                            })
                            .catch(err => console.log(err))
                    })
                // find user, get playlist id and spotify id and 
                // then using those, get the playlist from spotify api,
                // then modify the songsids instead of the queue

                // find playlist id instead of user
                // spotifyApi.getPlaylist(process.env.SPOTIFY_USER, process.env.SPOTIFY_PLAYLIST)
                // gets the playlist on spotify using the users spotifyID and playlist ID
                // spotifyApi.getPlaylist(user.spotifyID, user.playlistID)
                //     .then(data => {
                //         if (queue.songsIDs.length !== 0) {
                //             const playlistInfo = {
                //                 url: data.body.external_urls.spotify,
                //                 image: data.body.images[0].url,
                //                 tracks: data.body.tracks.items.map(i => formatSong(i.track))
                //             }
                //             cb(null, playlistInfo.tracks)
                //         }
                //         else cb(null, [])
                //     })
                //     .catch(err => console.log(err));
            })
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
