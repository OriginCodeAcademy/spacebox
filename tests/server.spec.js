'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const { server } = require('../server/server');

chai.use(chaiHttp);
const expect = chai.expect;

describe('server.js', () => {
  beforeEach((done) => {
    server.listen(4444);
    done();
  });

  it('responds to /', (done) => {
    chai.request(server)
      .get('/')
      .end((err, res) => {
        const exists = expect(err).not.exist;
        const status = expect(res).to.have.status(200);
        done();
      });
  });
});