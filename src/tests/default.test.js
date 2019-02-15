/* eslint-disable prefer-destructuring */
/* eslint-disable no-undef */
import chai from 'chai';

import chaiHttp from 'chai-http';
import chaiLike from 'chai-like';
import chaiThings from 'chai-things';
import { app } from '../server';

const expect = chai.expect;

chai.use(chaiLike);
chai.use(chaiThings);
chai.use(chaiHttp);

describe('GET /', () => {
  it('should return a message to inform of it use', (done) => {
    chai.request(app)
      .get('/')
      .send()
      .end((err, { status, body }) => {
        expect(status).to.eql(200);
        expect(body).to.have.property('message').eql('welcome to politico API, please used the specified endpoints from the readme file');
        done();
      });
  });
});
