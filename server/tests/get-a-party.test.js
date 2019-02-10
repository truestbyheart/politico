/* eslint-disable prefer-destructuring */
/* eslint-disable no-undef */
const chai = require('chai');

const chaiHttp = require('chai-http');
chai.use(require('chai-like'));
chai.use(require('chai-things'));

chai.use(chaiHttp);

// eslint-disable-next-line no-unused-vars
const expect = chai.expect;
const { app } = require('../server');
const { Parties } = require('../route/route');

describe('GET /parties/:id', () => {
  Parties.length = 0;
  it('should send a message if there is no party', (done) => {
    chai.request(app)
      .get('/v1/parties/5')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(404);
        expect(res.body.message).to.equal('There is no party with the specified ID');
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
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(200);
        done();
      });
  });
});
