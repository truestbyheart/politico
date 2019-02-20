/* eslint-disable prefer-destructuring */
/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import { app } from '../server';
import { Offices } from '../controller/office';

chai.use(require('chai-like'));
chai.use(require('chai-things'));

// eslint-disable-next-line no-unused-vars
const expect = chai.expect;


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
      .end((err, { status, body }) => {
        expect(status).to.equal(200);
        expect(body.status).to.equal(200);
        expect(body.data)
          .to.be.an('object').have.property('name').eql('dmo');
        done();
      });
  });
  it('should not accept empty values', (done) => {
    const officeTestData = {
      name: 'opd',
      type: '',
    };

    chai
      .request(app)
      .patch('/v1/offices/1')
      .send(officeTestData)
      .end((err, { status, body }) => {
        expect(status).to.equal(200);
        expect(body.status).to.equal(200);
        expect(body.data).eql('type is empty, created but not stored');
        done();
      });
  });
});