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

describe('GET /offices', () => {
  it('should GET all the offices', (done) => {
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
      .get('/v1/offices')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.Data).to.have.lengthOf(2);
        done();
      });
  });
  it('should GET a message if empty', (done) => {
    Offices.length = 0;
    chai
      .request(app)
      .get('/v1/offices')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(404);
        expect(res.body.message).to.equal('There is no data at the moment');
        done();
      });
  });
});
