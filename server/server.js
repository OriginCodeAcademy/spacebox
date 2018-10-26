const express = require('express');
const Server = require('socket.io');
const app = express();
const server = require('http').Server(app);
const io = new Server(server);

var SpotifyWebApi = require('spotify-web-api-node');
const defaultSongs = require('./default');
require('dotenv').config();

/**
 * A global array of Spotify track objects
 * @type {Array<{}>}
 */
var songs = [];

/**
 * Last song played
 */
var lastPlayed = {};

let lastTime = new Date();
let accessToken = null;
let refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.SITE_URL || 'http://localhost:8080',
  refreshToken
});

app.get('/login', (req, res) => {
  const scopes = [
    'playlist-modify-public',
    'playlist-read-private',
    'playlist-modify-private',
    'streaming',
    'app-remote-control',
    'user-modify-playback-state',
    'user-read-currently-playing',
    'user-read-playback-state'
  ];
  res.redirect(spotifyApi.createAuthorizeURL(scopes, 'spacebox'))
})

app.get('/auth', (req, res) => {
  const { code, state } = req.query;

  if (state === 'spacebox' && code) {
    spotifyApi.authorizationCodeGrant(code)
      .then(data => {
        console.log('data:body:', data.body);
        spotifyApi.setAccessToken(data.body['access_token']);
        spotifyApi.setRefreshToken(data.body['refresh_token']);
        return {
          accessToken: data.body['access_token'],
          refreshToken: data.body['refresh_token']
        }
      })
      .then(() => res.redirect('/'))
      .catch((err) => res.send(err));
  }
  else {
    res.redirect('/');
  }
})

/**
 * checks if we have a valid access token and if not refreshes token
 * @param {{}} req users request
 * @param {{}} res servers response obj
 * @param {Function} cb callback function that is invoked after retrieving access token
 */
const checkToken = (req, res, cb) => {
  const currentTime = new Date();

  if (lastTime < currentTime || !accessToken) {
    spotifyApi.refreshAccessToken()
      .then(data => {
        lastTime = new Date();
        lastTime.setSeconds(data.body.expires_in);
        accessToken = data.body['access_token'];
        spotifyApi.setAccessToken(data.body['access_token']);
        cb();
      })
      .catch(err => console.log(err))
  } else {
    cb();
  }
}

/**
 * takes a track object and formats it
 * @param {{}} track the track object
 * @returns {{ id: String, name: String, artist: String, albumCover: String, duration: Number, uri: String }} formatted track
 */
const formatSong = track => ({
  id: track.id,
  name: track.name,
  artist: track.artists[0].name,
  albumCover: track.album.images[0].url,
  duration: track.duration_ms,
  uri: track.uri
})

/**
 * retrieves playlist from Spotify
 * @returns {{url: String, image: String, tracks: Array<{}>}} playlist information and tracks
 */
const getPlaylist = () => {
  return spotifyApi.getPlaylist(process.env.SPOTIFY_USER, process.env.SPOTIFY_PLAYLIST)
    .then(data => {
      if (data.body.tracks.items.length === 0) {
        songs = [];
        return songs;
      }
      const playlistInfo = {
        url: data.body.external_urls.spotify,
        image: data.body.images[0].url,
        tracks: data.body.tracks.items.map(i => formatSong(i.track))
      }
      songs = playlistInfo.tracks
      return songs;
    })
    .catch(err => console.log(err));
}

/** 
 * checking to see if URI exists in songs array 
 * @param {String} uri spotify track identifier
 * @return {Boolean} false if there is no duplicate
 */
const isDup = uri => songs.some(song => song.uri === uri);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST');
  next();
});
app.use(express.json());
app.use('/', express.static('build'));
app.use('/', express.static('public'));

app.get('/', (req, res) => res.render('index', { songs }));
app.get('/board', (req, res) => res.json(songs));

const updatePlaylist = async (songToAdd = null) => {
  const songs = await getPlaylist();
  return spotifyApi.getMyCurrentPlayingTrack()
    .then(response => {
      const songCurrentlyPlaying = response.body.item;
      const isJukeboxOn = response.body.is_playing;

      if (songs[0].uri === songCurrentlyPlaying.uri) {
        lastPlayed = songs[0];
        songs.shift();
      }
      else if (songs[0].uri !== songCurrentlyPlaying.uri && lastPlayed.uri !== songCurrentlyPlaying.uri) {
        // Make song list match currently playing
        while (songs.length && songs[0].uri !== songCurrentlyPlaying.uri)
          songs.shift();
      }
      // If new songs to add
      if (songToAdd) songs.push(songToAdd);

      // If last song and no longer playing ? add default songs.
      if (songs.length === 1) {
        songs.push(...defaultSongs.filter(s => s.uri !== songCurrentlyPlaying.uri));
      }

      let tracks = [...songs].map(s => s.uri);

      return spotifyApi.replaceTracksInPlaylist(process.env.SPOTIFY_USER, process.env.SPOTIFY_PLAYLIST, tracks)
        .then(() => {
          if (!isJukeboxOn) {
            setTimeout(() => {
              spotifyApi.play({
                context_uri: `spotify:user:${process.env.SPOTIFY_USER}:playlist:${process.env.SPOTIFY_PLAYLIST}`,
                offset: {
                  position: 1
                }
              })
                .catch(err => console.log(err))
            }, 5000);
          }

          if (lastPlayed.uri === songCurrentlyPlaying.uri) songs.unshift(lastPlayed);
          io.emit('update', songs);
          return songs;
        })
        .catch(err => ({ error: 'We couldn\'t add your song for some reason. Try again!', err }));
    })
    .catch(err => ({ error: 'SPACEBOX is turned off. Tell an instructor!', err }))
}

app.post('/api/request', (req, res) => {
  if (isDup(req.body.uri)) {
    res.json({ error: 'Duplicate song!' })
  }
  else {
    spotifyApi.getTrack(req.body.uri.slice(14))
      .then(track => {
        const trackData = formatSong(track.body);
        updatePlaylist(trackData)
          .then(songs => res.send(songs))
      })
      .catch(err => res.json({ error: 'Track doesn\'t exist! Try spotify:track:{SONG_ID}' }));
  }
});

app.get('/dashboard', (req, res) => {
  console.log('Bacon2');
  res.status(200).send('Bacon');
})

//Custom routes
app.get('/404', (req, res) => res.json({ message: 'Nothing is here. But thanks for checking!' }));

app.use('/api', checkToken);
app.get('/api/artist/:artist', (req, res) => {
  spotifyApi.searchArtists(req.params.artist)
    .then(data => {
      const items = data.body.artists.items;
      if (!items.length) res.send('Stop it');
      res.send(items[0])
    })
    .catch(err => console.log(err));
})

app.get('/api/playlist', async (req, res) => {
  const songs = await updatePlaylist();
  res.send(songs);
});

app.delete('/api/request', (req, res, next) => {
  spotifyApi.removeTracksFromPlaylist(process.env.SPOTIFY_USER, process.env.SPOTIFY_PLAYLIST, req.body.tracks)
    .then((response) => {
      io.emit('update', songs);
      res.send(response)
    })
    .catch(err => console.log(err))
});

module.exports = { server, checkToken };