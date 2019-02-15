/* eslint-disable prefer-destructuring */
/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import { app } from '../server';
import { Offices } from '../route/route';

chai.use(require('chai-like'));
chai.use(require('chai-things'));

// eslint-disable-next-line no-unused-vars
const expect = chai.expect;


chai.use(chaiHttp);

describe('DELETE /offices/:id', () => {
  it('should send a message if there is no office', (done) => {
    Offices.length = 0;
    chai
      .request(app)
      .delete('/v1/offices/5')
      .end((err, { status, body }) => {
        expect(status).to.equal(200);
        expect(body)
          .to.have.property('status')
          .eql(404);
        expect(body)
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
      .end((err, { status, body }) => {
        expect(status).to.equal(200);
        expect(body.status).to.equal(200);
        expect(body)
          .to.have.property('message')
          .eql('The office has been deleted successfully');
        done();
      });
  });
});
