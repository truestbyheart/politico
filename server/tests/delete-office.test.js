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

describe('DELETE /offices/:id', () => {
  it('should send a message if there is no office', (done) => {
    Offices.length = 0;
    chai
      .request(app)
      .delete('/v1/offices/5')
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

  it('should successful message', (done) => {
    Offices.length = 0;
    const officeTestData = {
      name: 'opd',
      type: 'legislature',
    };

    chai.request(app)
      .post('/v1/offices')
      .send(officeTestData)
      .end();
    chai
      .request(app)
      .delete('/v1/offices/1')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(200);
        expect(res.body)
          .to.have.property('message')
          .eql('The office has been deleted successfully');
        done();
      });
  });
});
