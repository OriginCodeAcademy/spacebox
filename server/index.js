const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

var songs = [];

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST');
    next();
});
app.use(express.json());
app.use('/', express.static('build'));
app.use('/', express.static('public'));


//Validation checks
app.post('*', (req,res,next) => {

  next();
})

//Main pages
app.get('/', (req,res) => res.render('index', { songs }));
app.get('/board', (req,res) => res.json(songs));

//Register
app.post('/request', (req,res) => {
  songs.push([]);
  io.emit('update', songs);
  res.json({ message: `Thanks` });
});

//Custom routes
app.get('/404', (req,res) => res.json({ message: 'Nothing is here. But thanks for checking!' }));

//Deleting teams
app.delete('/request', (req,res,next) => {
  const newSongs = songs.filter(t => t.name != req.body.name);
  songs = newSongs;
  io.emit('update', songs);
  return res.send('Team deleted');
});


const PORT = process.env.PORT || 8080;
http.listen(PORT, () => console.log(`Server is listening on ${PORT}`));