/* eslint-disable prefer-destructuring */
/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import { app } from '../server';
import { Offices } from '../controller/office';

chai.use(require('chai-like'));
chai.use(require('chai-things'));

// eslint-disable-next-line no-unused-vars
const should = chai.should();


chai.use(chaiHttp);

describe('POST /offices', () => {
  it('Should add a new party ', (done) => {
    Offices.length = 0;
    const office = {
      name: 'member of parliament',
      type: 'legislature',
    };

    chai
      .request(app)
      .post('/v1/offices')
      .send(office)
      .end((err, res) => {
        res.should.have.status(201);
        res.should.be.a('object');
        done();
      });
  });
  it('Should auto increment by 1', (done) => {
    Offices.length = 0;
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
      .end((err, { body }) => {
        body.should.have.status(201);
        body.should.be.a('object');
        body.should.have
          .property('data')
          .be.an('array')
          .that.contains.something.like({ id: 1 });
      });
    chai
      .request(app)
      .post('/v1/offices')
      .send(office2)
      .end((err, { body }) => {
        body.should.have.status(201);
        body.should.be.a('object');
        body.should.have
          .property('data')
          .be.an('array')
          .that.contains.something.like({ id: 2 });
        done();
      });
  });
  it('Should not duplicate party', (done) => {
    const office = {
      name: 'Deputy Speaker',
      type: 'legislature',
    };

    chai
      .request(app)
      .post('/v1/offices')
      .send(office)
      .end((err, { body }) => {
        body.should.have.status(200);
        body.should.be.a('object');
        body.should.have
          .property('message')
          .eql('The office already exists');
        done();
      });
  });

  it('should not receive data against its entity specs', (done) => {
    const office = {
      name: 'Deputy Speaker',
    };
    chai
      .request(app)
      .post('/v1/offices')
      .send(office)
      .end((err, { body }) => {
        body.should.have.status(200);
        body.should.be.a('object');
        body.should.have
          .property('message')
          .eql('The object  has the properties name instead of having name,type');
        done();
      });
  });

  it('should not receive empty value', (done) => {
    Offices.length = 0;
    const office = {
      name: 'Deputy Speaker',
      type: '',
    };
    chai
      .request(app)
      .post('/v1/offices')
      .send(office)
      .end((err, { body }) => {
        body.should.have.status(200);
        body.should.be.a('object');
        body.should.have.property('data').eql('type is empty, created but not stored');
        done();
      });
  });

  it('should not receive empty values', (done) => {
    Offices.length = 0;
    const office = {
      name: '',
      type: '',
    };
    chai
      .request(app)
      .post('/v1/offices')
      .send(office)
      .end((err, { body }) => {
        body.should.have.status(200);
        body.should.be.a('object');
        body.should.have.property('data').eql('name,type are empty, created but not stored');
        done();
      });
  });
});
