'use strict';
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server/server');
const song = require('../common/models/song.js');
const { getSong } = require('../server/utils/song');

chai.use(chaiHttp);
const expect = chai.expect;

server.listen(4444);

describe('loopback server', function() {
  this.timeout(7000);

  it('responds to /Song/Song_find', (done) => {
    chai.request(server)
      .get('/explorer/#!/Song/Song_find')
      .end((err, res) => {
        expect(err).not.exist;
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should return an error if bad URI is given', (done) => {
    getSong(undefined, '5bd74cdb91ba9430a03c469e')
      .then((response) => {
        expect(response).to.equal('Bad URI');
        done();
      })
  })

  it('should return an error if bad userID is given', (done) => {
    getSong('spotify:track:5HE2u1IOizZwM4kWMF5Jpb', undefined)
      .then((response) => {
        expect(response).to.equal('Bad userID');
        done();
      })
  })

  it('should return a song with name "Sunset"', (done) => {
    getSong('spotify:track:5HE2u1IOizZwM4kWMF5Jpb', '5bd74cdb91ba9430a03c469e')
      .then((response) => {
        expect(response[0].name).to.equal('Sunset')
        expect(response[0].duration).to.equal(213361)
        expect(response[0].artist).to.equal('Coubo')
        expect(response[0].uri).to.equal('spotify:track:5HE2u1IOizZwM4kWMF5Jpb')
        expect(response[0].albumCover).to.equal('https://i.scdn.co/image/2362328b20a356c1d23897d38531b1b93844c788')
        expect(response[0].spotifyId).to.equal('3iEZkGUTNMEEH39O5xbT6R')
        done();
      })
  })
})