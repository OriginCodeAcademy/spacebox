'use strict';
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server/server');
const { removeCurrentlyPlaying, addNewSong, addDefaultSongsAndGetURIs } = require('../server/utils/playlist');

chai.use(chaiHttp);
const expect = chai.expect;

server.listen(4444);

// Variables used in tests
var songArr1 = [{
  id: '5HE2u1IOizZwM4kWMF5Jpb',
  name: 'Sunset',
  artist: 'Coubo',
  albumCover: 'https://i.scdn.co/image/2362328b20a356c1d23897d38531b1b93844c788',
  duration: 213361,
  uri: 'spotify:track:5HE2u1IOizZwM4kWMF5Jpb'
}]

var songArr2 = [{
  id: '299vmLW2iaQxe8y9HLWNiH',
  name: 'just ask',
  artist: 'weird inside',
  albumCover: 'https://i.scdn.co/image/6b440d0d81145350b4bf87c7a77d679701dd4f22',
  duration: 173846,
  uri: 'spotify:track:299vmLW2iaQxe8y9HLWNiH'
},
{
  id: '5HE2u1IOizZwM4kWMF5Jpb',
  name: 'Sunset',
  artist: 'Coubo',
  albumCover: 'https://i.scdn.co/image/2362328b20a356c1d23897d38531b1b93844c788',
  duration: 213361,
  uri: 'spotify:track:5HE2u1IOizZwM4kWMF5Jpb'
}]

var songArr3 = [{
  name: 'Where Is My Mind',
  duration: 165160,
  artist: 'Maxence Cyrin',
  uri: 'spotify:track:4jNQkWhuzqrbqQuqanFFJ6',
  albumCover: 'https://i.scdn.co/image/c21c1e4c58342abb6f88dfe1b291c718f6a70e43',
  spotifyId: '4jNQkWhuzqrbqQuqanFFJ6',
  id: '5bd8d7c2466abee8136f2501'
}]

var songCurrentlyPlaying = { uri: 'spotify:track:299vmLW2iaQxe8y9HLWNiH' }


// Tests
describe('updatePlaylist functionality', () => {


  it('should remove the currently playing song from the songs array', (done) => {
    const promiseRemoveCurrentlyPlaying = removeCurrentlyPlaying(songArr2, songCurrentlyPlaying, '5bd78822b290189455e581ea')
    promiseRemoveCurrentlyPlaying.then((response) => {
      expect(response.songs[0].name).to.equal('Sunset')
      expect(response.songs[0].artist).to.equal('Coubo')
      expect(response.songs[0].uri).to.equal('spotify:track:5HE2u1IOizZwM4kWMF5Jpb')
      done();
    });
  });

  it('should find a song and add it to the end of the songs array when passed an empty array', (done) => {
    addNewSong('5bd8d7c2466abee8136f2501', [])
      .then((response) => {
        expect(String(response[0].name)).to.equal('Where Is My Mind')
        expect(String(response[0].artist)).to.equal('Maxence Cyrin')
        expect(String(response[0].uri)).to.equal('spotify:track:4jNQkWhuzqrbqQuqanFFJ6')
        done();
      });
  });

  it('should find a song and add it to the end of the songs array when passed an array with songs', (done) => {
    const promiseAddNewSong = addNewSong('5bd8d7c2466abee8136f2501', songArr1)
    promiseAddNewSong.then((response) => {
      expect(String(response[1].name)).to.equal('Where Is My Mind')
      expect(String(response[1].artist)).to.equal('Maxence Cyrin')
      expect(String(response[1].uri)).to.equal('spotify:track:4jNQkWhuzqrbqQuqanFFJ6')
      done();
    });
  });
});
