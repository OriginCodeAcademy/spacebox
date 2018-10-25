'use strict';

const chai = require('chai');
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
const chaiHttp = require('chai-http');
const {server} = require('../server/server');

chai.use(chaiHttp);
const expect = chai.expect;

describe('MongoDB', function() {
  this.timeout(10000);

  beforeEach(() => {

  });

  it('Should be able to connect to MongoDB', (done) => {
    const url = 'mongodb://localhost:27017/';
    MongoClient.connect(url, (err, db) => {
      expect(err).to.equal(null);
      db.close();
      done();
    });
  });
});
