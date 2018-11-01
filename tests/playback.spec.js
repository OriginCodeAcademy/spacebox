'use strict';

const React = require('react');
const expect = require('chai').expect;
const Nightmare = require('nightmare');
const server = require('../server/server');
const url = 'http://localhost:3000/';

let nightmare;

server.listen(3000);

describe('CurrentSong')
