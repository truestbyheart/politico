/* eslint-disable prefer-destructuring */
/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import { app } from '../server';
import { Parties } from '../controller/parties';

chai.use(require('chai-like'));
chai.use(require('chai-things'));

chai.use(chaiHttp);

// eslint-disable-next-line no-unused-vars
const expect = chai.expect;

describe('PATCH /parties/:id', () => {
  it('should send a message if there is no party', (done) => {
    Parties.length = 0;
    const party = {
      name: 'chama',
      hqAddress: 'p.o bo 12, singida',
      logoUrl: '/img/c.png',
    };

    chai.request(app)
      .patch('/v1/parties/5')
      .send(party)
      .end((err, { status, body }) => {
        expect(status).to.equal(200);
        expect(body).to.have.property('message').eql('There is no party with the specified ID');
        done();
      });
  });
  it('should return the edited party with a successful message', (done) => {
    Parties.length = 0;

    const party = {
      name: 'civic union front',
      hqAddress: 'p.o bo 1234, dar-es-salaam',
      logoUrl: '/img/cuf.png',
    };
    chai.request(app)
      .post('/v1/parties')
      .send(party)
      .end();


    const partyPatch = {
      name: 'chama',
      hqAddress: 'p.o bo 12, singida',
      logoUrl: '/img/c.png',
    };
    chai.request(app)
      .patch('/v1/parties/1')
      .send(partyPatch)
      .end((err, { status, body }) => {
        expect(status).to.equal(200);
        expect(body.status).to.equal(200);
        expect(body.data).to.be.an('object').have.property('name').eql('chama');
        done();
      });
  });

  it('should not accept empty values', (done) => {
    Parties.length = 0;

    const party = {
      name: 'civic union front',
      hqAddress: 'p.o bo 1234, dar-es-salaam',
      logoUrl: '/img/cuf.png',
    };
    chai.request(app)
      .post('/v1/parties')
      .send(party)
      .end();


    const partyPatch = {
      name: '',
      hqAddress: 'p.o bo 12, singida',
      logoUrl: '/img/c.png',
    };
    chai.request(app)
      .patch('/v1/parties/1')
      .send(partyPatch)
      .end((err, { status, body }) => {
        expect(status).to.equal(200);
        expect(body.status).to.equal(200);
        expect(body.data).eql('name is empty, created but not stored');
        done();
      });
  });
  it('should not duplicate the same edit', (done) => {
    Parties.length = 0;

    const party = {
      name: 'civic union front',
      hqAddress: 'p.o bo 1234, dar-es-salaam',
      logoUrl: '/img/cuf.png',
    };
    chai.request(app)
      .post('/v1/parties')
      .send(party)
      .end();

    const partyPatch = {
      name: 'civic union front',
      hqAddress: 'p.o bo 1234, dar-es-salaam',
      logoUrl: '/img/cuf.png',
    };
    chai.request(app)
      .patch('/v1/parties/1')
      .send(partyPatch)
      .end((err, { status, body }) => {
        expect(status).to.equal(200);
        expect(body.status).to.equal(200);
        expect(body.message).eql('The party already exists or your logo Url exists :-)');
        done();
      });
  });
});
