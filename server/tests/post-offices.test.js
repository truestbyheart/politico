/* eslint-disable prefer-destructuring */
/* eslint-disable no-undef */
const chai = require('chai');

const chaiHttp = require('chai-http');
chai.use(require('chai-like'));
chai.use(require('chai-things'));

// eslint-disable-next-line no-unused-vars
const should = chai.should();
const { app } = require('../server');
const { Offices } = require('./../route/route');

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
      .end((err, res) => {
        res.body.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have
          .property('Data')
          .be.an('array')
          .that.contains.something.like({ id: 1 });
      });
    chai
      .request(app)
      .post('/v1/offices')
      .send(office2)
      .end((err, res) => {
        res.body.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have
          .property('Data')
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
      .end((err, res) => {
        res.body.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have
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
      .post('/v1/parties')
      .send(office)
      .end((err, res) => {
        res.body.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have
          .property('message')
          .eql('Please make sure all properties are filled');
        done();
      });
  });

  it('should be case sensitive', (done) => {
    const office = {
      name: 'Deputy Speaker',
      Type: 'legislature',
    };
    chai
      .request(app)
      .post('/v1/parties')
      .send(office)
      .end((err, res) => {
        res.body.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have
          .property('note')
          .eql('The data should be case sensitive to the entity specs');
        done();
      });
  });
});
