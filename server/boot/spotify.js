'use strict';
const SpotifyWebApi = require('spotify-web-api-node');

module.exports = function(server) {
  var router = server.loopback.Router();

  router.get('/spotify', (req, res) => {

    const spotifyApi = new SpotifyWebApi({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      redirectUri: `${process.env.SITE_URL}/auth`,
    });
    
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
  });

  router.get('/auth', (req, res) => {
    const { code, state } = req.query;
  
    if (state === 'spacebox' && code) {
      const spotifyApi = new SpotifyWebApi({
        clientId: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        redirectUri: `${process.env.SITE_URL}/auth`,
      });

      spotifyApi.authorizationCodeGrant(code)
        .then(({ body: { 'access_token': accessToken, 'refresh_token': refreshToken, ...rest } }) => {

          const UserModel = server.models.user;

          return UserModel.findOrCreate({ where: { username: 'Origin' } }, {
            "email": "origin@email.com",
            "username": "Origin",
            "password": "origin",
            "spotifyAccessToken": accessToken,
            "spotifyRefreshToken": refreshToken
          });
        })
        .then(() => res.redirect('/'))
        .catch((err) => res.send(err));
    }
    else {
      res.redirect('/');
    }
  })

  
  server.use(router);
};