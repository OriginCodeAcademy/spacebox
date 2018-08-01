const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
var SpotifyWebApi = require('spotify-web-api-node');
require('dotenv').config();

var songs = [];

let lastTime = new Date();
let accessToken = null;
let refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;
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
    spotifyApi.getPlaylist('jy0ambrgj79gi3vw9ndg4qxlf', '25wrjLz6FFIPS4tnwartfC')
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
app.post('/request', (req, res) => {
  songs.push([]);
  io.emit('update', songs);
  res.json({ message: `Thanks` });
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

app.get('/api/playlist', (req, res) => {
  res.send(getPlaylist());
});

// app.post('/queue',(req, res ) => {
//   const link =`https://api.spotify.com/v1/users/jy0ambrgj79gi3vw9ndg4qxlf/playlists/25wrjLz6FFIPS4tnwartfC/tracks`
//   res.send(link, playtistInfo) 
// });

//Deleting teams
app.delete('/api/request', (req, res, next) => {
  const newSongs = songs.filter(t => t.name != req.body.name);
  songs = newSongs;
  io.emit('update', songs);
  return res.send('Team deleted');
});


const PORT = process.env.PORT || 8080;
http.listen(PORT, checkToken(null, null, () => {
  getPlaylist();
  console.log(`Server is listening on ${PORT}`)
}));