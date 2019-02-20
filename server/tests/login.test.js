/* eslint-disable prefer-destructuring */
/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(require('chai-like'));
chai.use(require('chai-things'));

// eslint-disable-next-line no-unused-vars
const should = chai.should();


chai.use(chaiHttp);

describe('POST /login', () => {
  it('should give me a token', (done) => {
    done();
  });
});
