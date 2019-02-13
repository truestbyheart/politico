/* eslint-disable prefer-destructuring */
/* eslint-disable no-undef */
const chai = require('chai');

const chaiHttp = require('chai-http');
chai.use(require('chai-like'));
chai.use(require('chai-things'));

// eslint-disable-next-line no-unused-vars
const expect = chai.expect;
const { app } = require('../server');
const { Offices } = require('./../route/route');

chai.use(chaiHttp);

describe('GET /soffices/:id', () => {
  it('should send a message if there is no offices', (done) => {
    Offices.length = 0;
    chai
      .request(app)
      .get('/v1/offices/5')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(404);
        expect(res.body.message).to.equal('There is no office with the specified ID');
        done();
      });
  });
  it('should return the required office with the id', (done) => {
    const office = {
      name: 'Deputy Speaker',
      type: 'legislature',
    };
    const office2 = {
      name: 'Speaker',
      type: 'legislature',
    };

    chai
      .request(app)
      .post('/v1/offices')
      .send(office)
      .end();
    chai
      .request(app)
      .post('/v1/offices')
      .send(office2)
      .end();
    chai
      .request(app)
      .get('/v1/offices/1')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(200);
        done();
      });
  });
});
