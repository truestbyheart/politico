/* eslint-disable prefer-destructuring */
/* eslint-disable no-undef */
import chai from 'chai';

import chaiHttp from 'chai-http';
import { app } from '../server';
import { Parties } from '../route/route';

chai.use(require('chai-like'));
chai.use(require('chai-things'));

// eslint-disable-next-line no-unused-vars
const expect = chai.expect;

chai.use(chaiHttp);

describe('GET /parties', () => {
  it('should GET all the parties', (done) => {
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
      .end();
    chai
      .request(app)
      .post('/v1/parties')
      .send(party2)
      .end();
    chai.request(app)
      .get('/v1/parties')
      .end((err, { status, body }) => {
        expect(status).to.equal(200);
        expect(body.Data).to.have.lengthOf(2);
        done();
      });
  });
  it('should GET a message if empty', (done) => {
    Parties.length = 0;
    chai
      .request(app)
      .get('/v1/parties')
      .end((err, { status, body }) => {
        expect(status).to.equal(200);
        expect(body.status).to.equal(404);
        expect(body.message).to.equal('There is no data at the moment');
        done();
      });
  });
});
