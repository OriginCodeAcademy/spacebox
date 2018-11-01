'use strict';
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server/server');
const song = require('../common/models/song.js');
const {getSong} = require('../server/utils/song');

chai.use(chaiHttp);
const expect = chai.expect;

server.listen(4444);

describe('getSong functionality', function() {
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
      });
  });

  it('should return an error if bad userID is given', (done) => {
    getSong('spotify:track:5HE2u1IOizZwM4kWMF5Jpb', undefined)
      .then((response) => {
        expect(response).to.equal('Bad userID');
        done();
      });
  });
});
