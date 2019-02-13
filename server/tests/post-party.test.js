/* eslint-disable prefer-destructuring */
/* eslint-disable no-undef */
const chai = require('chai');

const chaiHttp = require('chai-http');
chai.use(require('chai-like'));
chai.use(require('chai-things'));

// eslint-disable-next-line no-unused-vars
const should = chai.should();
const { app } = require('../server.js');
const { Parties } = require('./../route/route');

chai.use(chaiHttp);

describe('POST /parties', () => {
  it('Should add a new party ', (done) => {
    const party = {
      name: 'chama cha mapinduzi',
      hqAddress: 'p.o bo 1234, dar-es-salaam',
      logoUrl: '/img/ccm.png',
    };

    chai
      .request(app)
      .post('/v1/parties')
      .send(party)
      .end((err, res) => {
        res.should.have.status(201);
        res.should.be.a('object');
        done();
      });
  });
  it('Should auto increment by 1', (done) => {
    Parties.length = 0;
    const party = {
      name: 'civic union front',
      hqAddress: 'p.o bo 1234, dar-es-salaam',
      logoUrl: '/img/cuf.png',
    };
    const party2 = {
      name: 'chama cha maendeleo na demokrasia',
      hqAddress: 'p.o bo 1234, dar-es-salaam',
      logoUrl: '/img/chadema.png',
    };

    chai
      .request(app)
      .post('/v1/parties')
      .send(party)
      .end((err, res) => {
        res.body.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('Data').be.an('array').that.contains.something.like({ id: 1 });
      });
    chai
      .request(app)
      .post('/v1/parties')
      .send(party2)
      .end((err, res) => {
        res.body.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('Data').be.an('array').that.contains.something.like({ id: 2 });
        done();
      });
  });
  it('Should not duplicate party', (done) => {
    const party = {
      name: 'civic union front',
      hqAddress: 'p.o bo 1234, dar-es-salaam',
      logoUrl: '/img/cuf.png',
    };

    chai
      .request(app)
      .post('/v1/parties')
      .send(party)
      .end((err, res) => {
        res.body.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have
          .property('message')
          .eql('The party already exists');
        done();
      });
  });

  it('should not receive data against its entity specs', (done) => {
    const party = {
      name: 'chama cha mapinduzi',
      hqAddress: 'p.o bo 1234, dar-es-salaam',
    };
    chai
      .request(app)
      .post('/v1/parties')
      .send(party)
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
    const party = {
      name: 'chama cha mapinduzi',
      hqaddress: 'p.o bo 1234, dar-es-salaam',
      logoUrl: '/img/ccm.png',
    };
    chai
      .request(app)
      .post('/v1/parties')
      .send(party)
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
