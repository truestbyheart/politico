/* eslint-disable prefer-destructuring */
/* eslint-disable no-undef */
const chai = require('chai');

const chaiHttp = require('chai-http');
chai.use(require('chai-like'));
chai.use(require('chai-things'));

// eslint-disable-next-line no-unused-vars
const expect = chai.expect;
const { app } = require('../server');
const { Parties } = require('../route/route');

chai.use(chaiHttp);

describe('GET /parties', () => {
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
  it('should GET all the parties', (done) => {
    chai.request(app)
      .get('/v1/parties')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.Data).to.have.lengthOf(2);
        done();
      });
  });
  it('should GET a message if empty', (done) => {
    Parties.length = 0;
    chai
      .request(app)
      .get('/v1/parties')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(404);
        expect(res.body.message).to.equal('There is no data at the moment');
        done();
      });
  });
});
