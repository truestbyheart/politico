/* eslint-disable no-unused-vars */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import { app } from '../server';
import { Parties } from '../route/route';

chai.use(require('chai-like'));
chai.use(require('chai-things'));

// eslint-disable-next-line nso-unused-vars
const should = chai.should();

chai.use(chaiHttp);

describe('POST /parties', () => {
  it('Should add a new party ', (done) => {
    Parties.length = 0;
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
      .end((err, { body }) => {
        body.should.have.status(201);
        body.should.be.a('object');
        body.should.have.property('Data').be.an('array').that.contains.something.like({ id: 1 });
      });
    chai
      .request(app)
      .post('/v1/parties')
      .send(party2)
      .end((err, { body }) => {
        body.should.have.status(201);
        body.should.be.a('object');
        body.should.have.property('Data').be.an('array').that.contains.something.like({ id: 2 });
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
      .end((err, { body }) => {
        body.should.have.status(200);
        body.should.be.a('object');
        body.should.have
          .property('message')
          .eql('The party already exists or your logo Url exists :-)');
        done();
      });
  });

  it('should not receive data against its entity specs', (done) => {
    Parties.length = 0;
    const party = {
      name: 'chama cha mapinduzi',
      hqAddress: 'p.o bo 1234, dar-es-salaam',
    };
    chai
      .request(app)
      .post('/v1/parties')
      .send(party)
      .end((err, { body }) => {
        body.should.have.status(200);
        body.should.be.a('object');
        body.should.have
          .property('message')
          .eql('The object  has the properties name,hqAddress instead of having name,hqAddress,logoUrl');
        done();
      });
  });

  it('should not allow empty value', (done) => {
    Parties.length = 0;
    const party = {
      name: '',
      hqAddress: 'p.o bo 1234, dar-es-salaam',
      logoUrl: '/ccm.png',
    };
    chai
      .request(app)
      .post('/v1/parties')
      .send(party)
      .end((err, { body }) => {
        body.should.have.status(201);
        body.should.be.a('object');
        body.should.have.property('Data').eql('name is empty, created but not stored');
        done();
      });
  });
  it('should not allow empty values', (done) => {
    Parties.length = 0;
    const party = {
      name: '',
      hqAddress: 'p.o bo 1234, dar-es-salaam',
      logoUrl: '',
    };
    chai
      .request(app)
      .post('/v1/parties')
      .send(party)
      .end((err, { body }) => {
        body.should.have.status(201);
        body.should.be.a('object');
        body.should.have.property('Data').eql('name,logoUrl are empty, created but not stored');
        done();
      });
  });
});
