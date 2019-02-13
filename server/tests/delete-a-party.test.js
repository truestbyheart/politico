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


describe('DELETE /parties', () => {
  it('should send a message if there is no party', (done) => {
    Parties.length = 0;
    chai.request(app)
      .delete('/v1/parties/5')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('status').eql(404);
        expect(res.body).to.have.property('message').eql('There is no party with the specified ID');
        done();
      });
  });

  it('should successful message', (done) => {
    const party = {
      name: 'civic union front',
      hqAddress: 'p.o bo 1234, dar-es-salaam',
      logoUrl: '/img/cuf.png',
    };
    chai.request(app)
      .post('/v1/parties')
      .send(party)
      .end();
    chai.request(app)
      .delete('/v1/parties/1')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(200);
        expect(res.body).to.have.property('message').eql('The party has been deleted successfully');
        done();
      });
  });
});
