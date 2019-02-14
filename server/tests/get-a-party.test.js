/* eslint-disable prefer-destructuring */
/* eslint-disable no-undef */
import chai from 'chai';

import chaiHttp from 'chai-http';
import { app } from '../server';
import { Parties } from '../route/route';

chai.use(require('chai-like'));
chai.use(require('chai-things'));

chai.use(chaiHttp);

// eslint-disable-next-line no-unused-vars
const expect = chai.expect;

describe('GET /parties/:id', () => {
  Parties.length = 0;
  it('should send a message if there is no party', (done) => {
    chai.request(app)
      .get('/v1/parties/5')
      .end((err, { status, body }) => {
        expect(status).to.equal(200);
        expect(body.status).to.equal(404);
        expect(body.message).to.equal('There is no party with the specified ID');
        done();
      });
  });
  it('should return the required party with the id', (done) => {
    const party = {
      name: 'chama cha mapinduzi',
      hqAddress: 'p.o bo 1234, dar-es-salaam',
      logoUrl: '/img/ccm.png',
    };

    chai
      .request(app)
      .post('/v1/parties')
      .send(party)
      .end();
    chai.request(app)
      .get('/v1/parties/1')
      .end((err, { status, body }) => {
        expect(status).to.equal(200);
        expect(body.status).to.equal(200);
        done();
      });
  });
});
