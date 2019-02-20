/* eslint-disable no-unused-vars */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';


chai.use(require('chai-like'));
chai.use(require('chai-things'));

// eslint-disable-next-line nso-unused-vars
const should = chai.should();

chai.use(chaiHttp);

describe('POST /signup', () => {
  it('should register me', (done) => {
    done();
  });
});
