const express = require('express');
const app = express();
app.use(express.json())
const http = require('http').Server(app);
const io = require('socket.io')(http);
var SpotifyWebApi = require('spotify-web-api-node');
require('dotenv').config();

var songs = [];

let lastTime = new Date();
let accessToken = null;
let refreshToken = process.env.SPOTIFY_REFRESH_TOKEN_AV;
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: 'http://localhost:8080/',
  refreshToken
});
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

  const getPlaylist = () => {
    return spotifyApi.getPlaylist(process.env.SPOTIFY_USER_AV, process.env.SPOTIFY_PLAYLIST_AV)
      .then(data => {
        const playlistInfo = {
          url: data.body.external_urls.spotify,
          image: data.body.images[0].url,
          tracks: data.body.tracks.items.map(i => ({
            id: i.track.id,
            name: i.track.name,
            artist: i.track.artists[0].name,
            albumCover: i.track.album.images[0].url,
            duration: i.track.duration_ms,
            uri: i.track.uri
          }))
        }
        songs = playlistInfo.tracks
        io.emit('update', songs)
        return songs;
      })
      .catch(err => console.log(err));
  }

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST');
  next();
});
app.use(express.json());
app.use('/', express.static('build'));
app.use('/', express.static('public'));


//Validation checks
app.post('*', (req, res, next) => {

  next();
})

//Main pages
app.get('/', (req, res) => res.render('index', { songs }));
app.get('/board', (req, res) => res.json(songs));


//Register
app.post('/api/request', (req, res) => {
  spotifyApi.addTracksToPlaylist(process.env.SPOTIFY_USER_AV, process.env.SPOTIFY_PLAYLIST_AV, [req.body.uri])
  .then((response) => {
  res.send(response)
  })
  .catch(err => console.log(err))
  io.emit('update', songs);
});

//Custom routes
app.get('/404', (req, res) => res.json({ message: 'Nothing is here. But thanks for checking!' }));


app.use('/api', checkToken);
app.get('/api/artist/:artist', (req, res) => {
  // clientId, clientSecret and refreshToken has been set on the api object previous to this call.
  spotifyApi.searchArtists(req.params.artist)
    .then(data => {
      const items = data.body.artists.items;
      if (!items.length) res.send('Stop it');
      res.send(items[0])
    })
    .catch(err => console.log(err));
})

app.get('/api/playlist', async (req, res) => {
  const songs = await getPlaylist();
  res.send(songs);
});

app.get('/api/pause', (req, res) => {
  spotifyApi.pause()
  .then((data) => {
    res.send(data);
  })
  .catch(err => console.log(err))
})
app.get('/api/play', (req, res) => {
  spotifyApi.play()
  .then((data) => {
    res.send(data);
  })
  .catch(err => console.log(err))
})

// app.post('/queue',(req, res ) => {
//   const link =`https://api.spotify.com/v1/users/jy0ambrgj79gi3vw9ndg4qxlf/playlists/25wrjLz6FFIPS4tnwartfC/tracks`
//   res.send(link, playtistInfo) 
// });

//Deleting teams
app.delete('/api/request', (req, res, next) => {
  // const newSongs = songs.filter(t => t.name != req.body.name);
  spotifyApi.removeTracksFromPlaylist(process.env.SPOTIFY_USER_AV, process.env.SPOTIFY_PLAYLIST_AV, req.body.tracks)
    .then((response) => {
      res.send(response)
    })
    .catch(err => console.log(err))
  io.emit('update', songs);
  return res.send('Team deleted');
});


const PORT = process.env.PORT || 8080;
http.listen(PORT, checkToken(null, null, () => {
  getPlaylist();
  console.log(`Server is listening on ${PORT}`)
}));