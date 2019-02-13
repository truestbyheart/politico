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
describe('PATCH /offices/:id', () => {
  it('should send a message if there is no office', (done) => {
    Offices.length = 0;
    const office = {
      name: 'dmo',
      type: 'legislature',
    };

    chai
      .request(app)
      .patch('/v1/offices/5')
      .send(office)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body)
          .to.have.property('status')
          .eql(404);
        expect(res.body)
          .to.have.property('message')
          .eql('There is no office with the specified ID');
        done();
      });
  });
  it('should return the edited office with a successful message', (done) => {
    Offices.length = 0;
    const officeTestData = {
      name: 'opd',
      type: 'legislature',
    };

    chai.request(app)
      .post('/v1/offices')
      .send(officeTestData)
      .end();

    const office = {
      name: 'dmo',
      type: 'legislature',
    };
    chai
      .request(app)
      .patch('/v1/offices/1')
      .send(office)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(200);
        expect(res.body.Data)
          .to.be.an('array')
          .that.contains.something.like({ name: 'dmo' });
        done();
      });
  });
});
