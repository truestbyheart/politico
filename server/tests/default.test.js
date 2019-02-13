/* eslint-disable prefer-destructuring */
/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');
const chaiLike = require('chai-like');
const chaiThings = require('chai-things');

const expect = chai.expect;
const { app } = require('../server.js');

chai.use(chaiLike);
chai.use(chaiThings);
chai.use(chaiHttp);

describe('GET /', () => {
  it('should return a message to inform of it use', (done) => {
    chai.request(app)
      .get('/')
      .send()
      .end((err, res) => {
        expect(res.status).to.eql(200);
        expect(res.body).to.have.property('message').eql('welcome to politico API, please used the specified endpoints from the readme file');
        done();
      });
  });
});
