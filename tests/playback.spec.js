'use strict';

const React = require('react');
const expect = require('chai').expect;
const Nightmare = require('nightmare');
const server = require('../server/server');
const url = 'http://localhost:3000/#';

let nightmare;

server.listen(3000);

describe('Playback Button', () => {
  beforeEach(() => {
    nightmare = Nightmare({
      show: true
    })
  });

  it('should exist', function (done) {
    this.timeout(10000);
    nightmare
      .goto(url + '/dashboard')
      .wait(1000)
      .evaluate(() => document.querySelector('#play-btn-circle').id)
      .end()
      .then(id => {
        expect(id).to.equal('play-btn-circle')
        done()
      })
  });

  it('should alter playing on-click', function () {
    nightmare
      .goto(url + '/dashboard')
      .wait(3000)
      .click('div[name=play]')
      .wait(3000)
      .evaluate(() => document.querySelector('.play-pause').value)
      .end()
      .then(value => {
        expect(value).to.equal('true')
        done()
      })
  });
})
