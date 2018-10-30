'use strict';
const socketEvents = require('./events/socketEvents');
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
    console.log('user is connected');
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> Updated socket.io
  
    socket.on('room', (room) => {
      console.log(room);
      // socket.join(queueId);
      
      setTimeout(() => {
        //broadcast to specific rooms

      }, 5000);


<<<<<<< HEAD
=======
    socket.on('event', (event) => {
      socketEvents.eventHandler(socket, event, app);
    });
    socket.on('action', (action) => {
      socketEvents.actionHandler(socket, action, app);
>>>>>>> Added socket.io
=======
>>>>>>> Updated socket.io
    });
  });
});

