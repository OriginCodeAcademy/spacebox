const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
var SpotifyWebApi = require('spotify-web-api-node');
require('dotenv').config();

/**
 * A global array of Spotify track objects
 * @type {Array<{}>}
 */
var songs = [];

let lastTime = new Date();
let accessToken = null;
let refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: `${process.env.SITE_URL}/auth`,
  refreshToken
});

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

app.get('/board', (req, res) => res.json(songs));

const updatePlaylist = async (trackData = null) => {
  const songs = await getPlaylist();
  return spotifyApi.getMyCurrentPlayingTrack()
          .then(response => {
            
            while (songs.length && songs[0].uri !== response.body.item.uri) {
              songs.shift()
            }
            if (songs.length===1 && songs[0].uri === response.body.item.uri && !response.body.is_playing) {
              songs.shift()
            }
            if(trackData) {
              songs.push(trackData);
            }
            return spotifyApi.replaceTracksInPlaylist(process.env.SPOTIFY_USER, process.env.SPOTIFY_PLAYLIST, songs.map(s => s.uri))
              .then(response2 => {
                if (!response.body.is_playing) {
                  spotifyApi.play({
                    context_uri: `spotify:user:${process.env.SPOTIFY_USER}:playlist:${process.env.SPOTIFY_PLAYLIST}`
                  })
                  .catch(err => res.send(err));
                }
                io.emit('update', songs);
                return songs;
              })
              .catch(err => ({ error: 'We couldn\'t add your song for some reason. Try again!', err}));  
            })
            .catch(err => ({ error: 'SPACEBOX is turned off. Tell an instructor!', err}))
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
      .catch(err => res.json({ error: 'Track doesn\'t exist! Try spotify:track:{SONG_ID}'}));
  }
});

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

const PORT = process.env.PORT || 8080;
http.listen(PORT, checkToken(null, null, () => {
  console.log(`Server is listening on ${PORT}`)
}));