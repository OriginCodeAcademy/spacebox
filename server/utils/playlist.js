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

function removeCurrentlyPlaying(songs, songCurrentlyPlaying, queueId) {
  return new Promise((resolve, reject) => {
    const { Queue, Song } = app.models;
    // update database so the queue matches song track from spotify 
    Queue.findById(queueId)
      .then((queue) => {
        // last played is first song in the queue
        if (!queue.songIds.length) {
          return resolve({
            songs,
            lastPlayed: undefined
          })
        }

        let lastPlayed = queue.songIds[0];
        Song.findById(lastPlayed)
          .then((songObject) => {
            var lastPlayedObject = songObject
            if (songs[0].uri === songCurrentlyPlaying.uri) {
              // update the queue so it matches songs(from spotify)
              let songURIs = songs.map(s => s.uri)
              getSongIds(songURIs)
                .then((songIds) => {
                  const songIdArray = songIds
                  var newQueue = {
                    "defaultSongs": queue.defaultSongs,
                    "id": queue.id,
                    "songIds": songIdArray,
                    "userId": queue.userId
                  }
                  Queue.replaceOrCreate(newQueue)
                  // update lastplayed here (Do I still need to do this? duplicating the default above)
                  Queue.findById(queue.id)
                    .then((queue) => {
                      lastPlayed = queue.songIds[0]
                      // remove first song from spotify
                      songs.shift();
                      return resolve({
                        songs,
                        lastPlayed
                      })
                    })
                })
                .catch(err => ({ error: '', err }))
            }
            else if (songs[0].uri !== songCurrentlyPlaying.uri && lastPlayedObject.uri !== songCurrentlyPlaying.uri) {
              // Make song list match currently playing
              while (songs.length && songs[0].uri !== songCurrentlyPlaying.uri) songs.shift();
              // update queue so it matches songs
              let songURIs = [...songs].map(s => s.uri)
              getSongIds(songURIs)
                .then((songIds) => {
                  const songIdArray = songIds
                  var newQueue = {
                    "defaultSongs": queue.defaultSongs,
                    "id": queue.id,
                    "songIds": songIdArray,
                    "userId": queue.userId
                  }
                  Queue.replaceOrCreate(newQueue)
                  // update last playded it be song[0]
                  lastPlayed = newQueue.songIds[0]
                  // shift queue one more time so it doesn't have currently playing song
                  songs.shift()
                  songURIs = [...songs].map(s => s.uri)
                  getSongIds(songURIs)
                    .then((songIds) => {
                      const songIdArray = songIds
                      var newQueue = {
                        "defaultSongs": queue.defaultSongs,
                        "id": queue.id,
                        "songIds": songIdArray,
                        "userId": queue.userId
                      }
                      Queue.replaceOrCreate(newQueue)
                      return resolve({
                        songs,
                        lastPlayed
                      })
                    })
                    .catch(err => reject(err))
                })
                .catch(err => reject(err))
            }
            else {
              return resolve({
                songs,
                lastPlayed
              })
            }
          })
          .catch(err => reject(err))
      })
      .catch(err => ({ error: 'couldnt find queue id', err }))
  })
    .catch(err => reject(err))
}

function addNewSong(songID, songs) {
  return new Promise((resolve, reject) => {
    const { Song } = app.models;
    if (songID) {
      Song.findById(songID)
        .then((song) => {
          if (songs.every((track) => track.uri !== song.uri)) {
            songs.push(song)
            resolve(songs)
          }
          else reject({ message: 'Duplicate song' })
        })
        .catch(err => reject(err))
    }
    else resolve(songs)
  })
}

function getSongIds(songURIs) {
  return new Promise((resolve, reject) => {
    const { Song } = app.models;
    Song.find({})
      .then((songs) => {
        let songIds = songURIs.map((uri) => {
          return songs.filter((song) => song.uri == uri)
            .map((song) => song.id)
        })
        songIds = songIds.map((id) => id[0])
        resolve(songIds)
      })
      .catch(err => ({ error: 'Could not find matching song id', err }))
  })
    .catch(err => ({ error: 'Could not get song ids', err }))
}

function addDefaultSongsAndGetURIs(songs, id) {
  return new Promise((resolve, reject) => {
    const { Queue } = app.models;
    let songURIs = songs.map(s => s.uri)
    getSongIds(songURIs)
      .then((songIds) => {
        const justSongIds = songIds
        Queue.findById(id)
          .then((queue) => {
            if (songs.length === 1) {
              queue.default((err, defaultSongs) => {
                var defaultSongIds = defaultSongs.map((song) => song.id)
                var combinedSongIds = justSongIds.concat(defaultSongIds)
                var defaultSongURIs = defaultSongs.map((song) => song.uri)
                var combinedSongURIs = songURIs.concat(defaultSongURIs)
                resolve({
                  songIds: combinedSongIds,
                  songURIs: combinedSongURIs
                })
              })
            }
            else {
              resolve({
                songIds: justSongIds,
                songURIs: songURIs
              })
            }
          })
          .catch(err => ({ error: 'could not complete add default songs and get URIs function', err }))
      })
      .catch((err) => ({ error: 'could not complete getSongIds function within add default songs function', err }))
  })
}

function updatePlaylist(id, songID = null) {
  const { Queue, Song } = app.models;
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
                let songs = [...tracks]
                const songCurrentlyPlaying = response.body.item;
                const isJukeboxOn = response.body.is_playing;

                removeCurrentlyPlaying(songs, songCurrentlyPlaying, id)
                  .then((response) => {
                    songs = response.songs
                    lastPlayed = response.lastPlayed
                    addNewSong(songID, songs)
                      .then((songs) => {
                        addDefaultSongsAndGetURIs(songs, id)
                          .then((response) => {
                            let songURIs = response.songURIs;
                            let songIds = response.songIds;
                            return spotifyApi.replaceTracksInPlaylist(spotifyID, playlistID, songURIs)
                              .then(async () => {
                                if (lastPlayed) {
                                  await Song.findById(lastPlayed)
                                    .then((lastPlayedSongObject) => {
                                      if (lastPlayedSongObject.uri === songCurrentlyPlaying.uri) {
                                        songIds.unshift(lastPlayed)
                                      }
                                    })
                                    .catch(err => reject(err))
                                }
                                // io.emit('update', songs);
                                // what is the below function doing?
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
                                Queue.findById(id)
                                  .then((singleQueue) => {
                                    var queue = {
                                      "defaultSongs": singleQueue.defaultSongs,
                                      "id": id,
                                      "songIds": songIds,
                                      "userId": userID
                                    }
                                    resolve(queue)
                                  })
                                  .catch(err => reject(err))
                              })
                          })
                          .catch(err => reject(err))
                      })
                      .catch(err => reject(err))
                  })
              })
              .catch(err => ({ error: 'SPACEBOX is turned off. Tell an instructor!', err }))
          })
          .catch(err => reject(err))
      })
      .catch(err => reject(err))
  })

}


module.exports = { getPlaylist, updatePlaylist, getAccessToken, removeCurrentlyPlaying, addNewSong, addDefaultSongsAndGetURIs }
