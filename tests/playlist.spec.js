'use strict';
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server/server');
const { updatePlaylist } = require('../server/utils/playlist');

chai.use(chaiHttp);
const expect = chai.expect;

server.listen(4444);

describe('addSong functionality', function () {
    this.timeout(7000);

    it('should return add a song to songs array', (done) => {
        addNewSong('5bd8d7c2466abee8136f2501', [{
            id: '5HE2u1IOizZwM4kWMF5Jpb',
            name: 'Sunset',
            artist: 'Coubo',
            albumCover: 'https://i.scdn.co/image/2362328b20a356c1d23897d38531b1b93844c788',
            duration: 213361,
            uri: 'spotify:track:5HE2u1IOizZwM4kWMF5Jpb'
        },
        {
            id: '4p5eACHBSDSKxvPrN1Ej5p',
            name: 'Affection',
            artist: 'Jinsang',
            albumCover: 'https://i.scdn.co/image/5a890af740cf1cd03e923d06bd2fe825e8a4e4b0',
            duration: 117495,
            uri: 'spotify:track:4p5eACHBSDSKxvPrN1Ej5p'
        },
        {
            id: '7evUPABneVddplechlReII',
            name: 'im closing my eyes (Feat. shiloh)',
            artist: 'potsu',
            albumCover: 'https://i.scdn.co/image/455ebef2d333d1e3730dfe29a3923ec83b18ae1e',
            duration: 118302,
            uri: 'spotify:track:7evUPABneVddplechlReII'
        }])
            .then((response) => {
                expect(response[0].name).to.equal('Sunset')
                done();
            })
    })
})