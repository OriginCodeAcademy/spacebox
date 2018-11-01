'use strict';
<<<<<<< HEAD
=======

<<<<<<< HEAD
<<<<<<< HEAD
const { getAccessToken } = require('../../server/utils/playlist')
>>>>>>> finished the db query and mapping out the results. currently working the functionality of two buttons to add the uri to the queue
=======
//const { getAccessToken } = require('../../server/utils/playlist')
>>>>>>> changed the function to add song to queue
=======

>>>>>>> updated the artist search results button and the song search button.
var loopback = require('loopback');
var boot = require('loopback-boot');
require('dotenv').config();
var app = module.exports = loopback();
app.start = function () {
  // start the web server
  return app.listen(function () {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function (err) {
  if (err) throw err;
  // start the server if `$ node server.js`
  if (require.main === module)
    app.io = require('socket.io')(app.start());
  app.io.on('connection', function(socket) {
    socket.on('room', (room) => {
      socket.join(room);
      setTimeout(() => {
        app.io.in(room).emit('update', []);
      }, 5000);
    });
  });
});
      app.start();
})
// var myuserID = '5bd9d108ef79ae228379334a';
// getAccessToken(myuserID)
//     .then(accessToken => {
//       const spotifyApi = new SpotifyWebApi({ accessToken });
//       spotifyApi.getPlaylist(spotifyID, playlistID)
//     }

<<<<<<< HEAD
<<<<<<< HEAD
    app.get('/api/spotify/:search', (req, res) => {
      axios.get(
        `https://api.spotify.com/v1/${type}/{${query}}`
      )
      .then(response => res.send(response.data))
    })
=======
//     app.get('/api/spotify/:search', (req, res) => {
//       axios.get(
//         `https://api.spotify.com/v1/${type}/{${query}}`
//       )
//       .then(response => res.send(response.data))
//     })
>>>>>>> changed the function to add song to queue
=======
    // app.get('/api/spotify/:search', (req, res) => {
    //   axios.get(
    //     `https://api.spotify.com/v1/search?q=${query}%20case%20insensitivity&type=${type}&limit=50`
    //   )
    //   .then(response => res.send(response.data))
    // })

app.get('/api/spotify/:search', (req, res) => {
  console.log('this is spotify');

axios({
  method: 'get',
  url: `https://api.spotify.com/v1/search?q=${query}%20case%20insensitivity&type=${type}&limit=50`,
  data: jsonData,
  dataType: 'json',
  headers: {
    'Autohorization': 'Bearer BQDV0NtfLwPGA2-AfeCYXktsIrVwVFHV20QZil198M1uQ79mYhS-jINEKwV_TldN0JSbUNp0OMSDPQCM86UeO7Q3HAFrowS9oa0EgRu5vMbVTTDFbgBV3biiQnjREjLXX8XU6rgOGGYgbkMA56FGJLPsak9RF-dowWO-I5Yb4l7TMFds-X3kAS4j6wcBDmfe7o6CIztZNh_onSV_4RD2x1r-8HAFxPISwjGH_zttqT9H6nskGT3MAuHpfaKmc20b1zdPFAnukwcNyQvZibsSWwKrr9mwkoMEn6o',
    'Content-Type': 'application/json'
  }})
  .then(res => {
    const data = {
      name: res.data.name,
      externalUrl: res.data.external_urls.spotify,
      playlistId: res.data.id
    }
    console.log('this is spotify data', data);
  })
})
>>>>>>> updated the artist search results button and the song search button.
