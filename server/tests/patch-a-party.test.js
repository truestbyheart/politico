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
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('message').eql('There is no party with the specified ID');
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
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(200);
        expect(res.body.Data).to.be.an('array').that.contains.something.like({ name: 'chama' });
        done();
      });
  });
});
