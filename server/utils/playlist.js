const app = require('../server')
const SpotifyWebApi = require('spotify-web-api-node');

function getAccessToken(userID = null) {
  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    redirectUri: process.env.SITE_URL || 'http://localhost:3000/auth',
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
        const userID = queue.userId;
        // takes the userID from the queue and gets spotifyID and playlistID from that user
        User.findById(userID)
          .then((user) => {
            const spotifyID = user.spotifyID
            const playlistID = user.playlistID
            getAccessToken(user.id)
              .then(accessToken => {
                const spotifyApi = new SpotifyWebApi({ accessToken });
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
                    const tracks = playlist.body.tracks.items.map(i => formatSong(i.track))
                    const output = {
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
            let lastPlayedObject = songObject
            if (songs[0].uri === songCurrentlyPlaying.uri) {
              // update the queue so it matches songs(from spotify)
              let songURIs = songs.map(s => s.uri)
              getSongIds(songURIs)
                .then((songIds) => {
                  const songIdArray = songIds
                  let newQueue = {
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
                  let newQueue = {
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
                      let newQueue = {
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
                let defaultSongIds = defaultSongs.map((song) => song.id)
                let combinedSongIds = justSongIds.concat(defaultSongIds)
                let defaultSongURIs = defaultSongs.map((song) => song.uri)
                let combinedSongURIs = songURIs.concat(defaultSongURIs)
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
        let userID = response.userID
        let spotifyID = response.spotifyID
        let playlistID = response.playlistID
        let tracks = response.tracks
        getAccessToken(userID)
          .then(accessToken => {
            const spotifyApi = new SpotifyWebApi({ accessToken });
            spotifyApi.getMyCurrentPlayingTrack()
              .then((response) => {
                // copying current playlist into a new array that we will mutate called songs
                let songs = [...tracks]
                const songCurrentlyPlaying = response.body.item;
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
                                Queue.findById(id)
                                  .then((singleQueue) => {
                                    let queue = {
                                      "defaultSongs": singleQueue.defaultSongs,
                                      "id": id,
                                      "songIds": songIds,
                                      "userId": userID
                                    }
                                    Song.find({})
                                      .then((songs) => {
                                        let fullSongs = songIds.map((id) => {
                                          return songs.filter((song) => song.id.toString() == id)
                                        })
                                        fullSongs = fullSongs.map((id) => id[0])
                                        app.io.in(id).emit('update', fullSongs)
                                        resolve(queue)
                                      })
                                      .catch(err => ({ error: 'could not get full song object', err }))
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
