const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
var SpotifyWebApi = require('spotify-web-api-node');
require('dotenv').config();

var songs = [];

let accessToken = process.env.SPOTIFY_ACCESS_TOKEN;
let refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;
const spotifyApi = new SpotifyWebApi({ 
  clientId: process.env.SPOTIFY_CLIENT_ID, 
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: 'http://localhost:8080/',
  accessToken,
  refreshToken 
});
const refreshSpotifyToken = () => spotifyApi.refreshAccessToken()
                .then(data => spotifyApi.setAccessToken(data.body['access_token']))
                .catch(err => console.log(err))();

const handShake = () => {
  //Retrieves authorizationURL which prompts login
  var authorizationUrl = spotifyApi.createAuthorizeURL(['playlist-read-private', 'playlist-modify-private', 'streaming', 'app-remote-control', 'user-modify-playback-state', 'user-read-currently-playing', 'user-read-playback-state'], 'random string')
  // Using code in response headers, requests a token
  spotifyApi.authorizationCodeGrant(process.env.CODE)
    .then(data => {
        spotifyApi.setAccessToken(data.body['access_token']);
        spotifyApi.setRefreshToken(data.body['refresh_token']);
      }
    )
    .catch(err => console.log(err))
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

app.get('/artist/:artist', (req,res) => {
  // clientId, clientSecret and refreshToken has been set on the api object previous to this call.
  spotifyApi.searchArtists(req.params.artist)
  .then(data => {
    const items = data.body.artists.items;
    if (!items.length) res.send('Stop it');
    res.send(items[0])
  })
  .catch(err => console.log(err));
})

//Deleting teams
app.delete('/request', (req, res, next) => {
  const newSongs = songs.filter(t => t.name != req.body.name);
  songs = newSongs;
  io.emit('update', songs);
  return res.send('Team deleted');
});


const PORT = process.env.PORT || 8080;
http.listen(PORT, () => console.log(`Server is listening on ${PORT}`));