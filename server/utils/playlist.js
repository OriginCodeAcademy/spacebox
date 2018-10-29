const app = require('../server')
const SpotifyWebApi = require('spotify-web-api-node');

function getAccessToken(userID = null) {
    const spotifyApi = new SpotifyWebApi({
        clientId: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        redirectUri: process.env.SITE_URL || 'http://localhost:8080',
    });
    return new Promise((resolve, reject) => {
        if (!userID) {
            reject('No user id provided');
            return false;
        }
        const { User } = app.models;
        User.findById(userID)
            .then((user) => {
                if (!user.spotifyRefreshToken) {
                    reject('No refresh token');
                    return false;
                }
                // get their refresh token and add accessToken
                spotifyApi.setRefreshToken(user.spotifyRefreshToken);
                spotifyApi.refreshAccessToken()
                    .then(({ body: { 'access_token': accessToken } }) => {
                        resolve(accessToken);
                    })
                    .catch(err => reject(err));
            })
    })
}

/**
 * 
 * @param {String} id ID for queue you're searching for
 * @returns {Promise} Resolves to array of objects with tracks on the playlist
 */
function getPlaylist(id) {
    return new Promise((resolve, reject) => {
        const { Queue, User } = app.models;
        // finds the correct queue based on the queue ID that you put in
        Queue.findById(id, { fields: { userId: true } })
            .then((queue) => {
                var userID = queue.userId;
                // takes the userID from the queue and gets spotifyID and playlistID from that user
                User.findById(userID)
                    .then((user) => {
                        var spotifyID = user.spotifyID
                        var playlistID = user.playlistID
                        getAccessToken(user.id)
                            .then(accessToken => {
                                const spotifyApi = new SpotifyWebApi({ accessToken });
                                // const spotifyApi = new SpotifyWebApi({ accessToken: 'BQDiDZR9-smMig0tVxtUaYQ6Z09tDRgvP8cLiH51T9wD5A00iLImkOvZ5eU8gMjT1C3tGIEo9YmIvQ06o4q3xRNlqVB1SZs9O16G8fpB8s3jwjjVNJtTPFtoxZktEXefds8VrOvbNrb8X1N9i_qppt9pP_d6MEOed8kV5wUPEZcKCSdxlQ5FtvwQ7Y1HBDiBUltcGwtRsEA14aJ7GKh321WlH6h-GdVMhUgXkvj7Fo0'});
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
                                        var output = {
                                            tracks: tracks,
                                            userID: userID,
                                            spotifyID: spotifyID,
                                            playlistID: playlistID
                                        }
                                        resolve(output)
                                    })
                                    .catch(err => reject(err));
                            })
                            .catch(err => reject(err))
                    })
            })
            .catch(err => reject(err));
    })
}

function removeCurrentlyPlaying(songs, songCurrentlyPlaying) {
    return new Promise((resolve, reject) => {
        if (songs[0].uri === songCurrentlyPlaying.uri) {
            // let lastPlayed = songs[0]
            songs.shift();
        }
        // else if (songs[0].uri !== songCurrentlyPlaying.uri && lastPlayed.uri !== songCurrentlyPlaying.uri) {
        else if (songs[0].uri !== songCurrentlyPlaying.uri) {
            // Make song list match currently playing
            while (songs.length && songs[0].uri !== songCurrentlyPlaying.uri)
                songs.shift();
        }
        resolve(songs)
    })
        .catch(err => reject(err))
}

function addNewSong(songID, songs) {
    return new Promise((resolve, reject) => {
        const { Song } = app.models;
        if (songID) {
            Song.findById(songID)
                .then((song) => {
                    songs.push(song)
                    resolve(songs)
                })
                .catch(err => reject(err))
        }
    })
}

function addDefaultSongs(songs) {
    return new Promise((resolve, reject) => {
        // const { Queue } = app.models;
        // if (songs.length === 1) {
        //     // songs.push(...Queue.defaultSongs.filter(s => s.uri !== songCurrentlyPlaying.uri))
        //     songs.push(...Queue.defaultSongs)
        //     resolve(songs)
        // }
        resolve(songs)
    })
        .catch(err => reject(err))
}

function updatePlaylist(id, songID = null) {
    const { Queue } = app.models;
    return new Promise((resolve, reject) => {
        getPlaylist(id)
            .then((response) => {
                var userID = response.userID
                var spotifyID = response.spotifyID
                var playlistID = response.playlistID
                var tracks = response.tracks
                getAccessToken(userID)
                    .then(accessToken => {
                        const spotifyApi = new SpotifyWebApi({ accessToken });
                        spotifyApi.getMyCurrentPlayingTrack()
                            .then((response) => {
                                // copying current playlist into a new array that we will mutate called songs
                                var songs = [...tracks]
                                // var lastPlayed = {}

                                const songCurrentlyPlaying = response.body.item;
                                const isJukeboxOn = response.body.is_playing;

                                removeCurrentlyPlaying(songs, songCurrentlyPlaying)
                                    .then((songs) => {
                                        addNewSong(songID, songs)
                                            .then((songs) => {
                                                addDefaultSongs(songs)
                                                    .then((songs) => {
                                                        let newPlaylist = [...songs].map(s => s.uri)
                                                        return spotifyApi.replaceTracksInPlaylist(spotifyID, playlistID, newPlaylist)
                                                            .then(() => {
                                                                if (!isJukeboxOn) {
                                                                    setTimeout(() => {
                                                                        spotifyApi.play({
                                                                            context_uri: `spotify:user:${spotifyID}:playlist:${playlistID}`,
                                                                            offset: {
                                                                                position: 1
                                                                            }
                                                                        })
                                                                            .catch(err => console.log(err))
                                                                    }, 5000);
                                                                }
                                                                // if (lastPlayed.uri === songCurrentlyPlaying.uri) songs.unshift(lastPlayed);
                                                                // io.emit('update', songs);
                                                                // Need to update the queue songID here in the queue model (queue.songIds.create()?)
                                                                var songIds = songs.map((song) => song.id)
                                                                resolve(songIds)
                                                            })

                                                    })
                                                    .catch(err => reject(err))
                                            })
                                            .catch(err => reject(err))
                                    })
                            })
                            .catch(err => reject(err))
                    })
                    .catch(err => reject(err));
            })
            .catch(err => reject(err))
    })

}


module.exports = { getPlaylist, getAccessToken, updatePlaylist }
