import pool from './connection';

const create = () => {
  const partyTable = `CREATE TABLE IF NOT EXISTS parties(
        id SERIAL PRIMARY KEY,
        name VARCHAR(120) NOT NULL,
        hqAddress VARCHAR(120) NOT NULL,
        logoUrl VARCHAR(120) NOT NULL,
        abbreviation VARCHAR(20) NOT NULL
    )`;


  const officeTable = `CREATE TABLE IF NOT EXISTS offices(
      id SERIAL PRIMARY KEY,
      name VARCHAR(122) NOT NULL,
      type VARCHAR(120) NOT NULL
  )`;

  const userTable = `CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        firstname VARCHAR(120) NOT NULL,
        lastname VARCHAR(120) NOT NULL,
        othername VARCHAR(120) NOT NULL,
        password VARCHAR(300) NOT NULL,
        email VARCHAR(125) NOT NULL,
        phonenumber VARCHAR(10) NOT NULL,
        passporturl VARCHAR(125) NOT NULL,
        isadmin boolean default false
    )`;

  const candidateTable = `CREATE TABLE IF NOT EXISTS candidates(
       id SERIAL UNIQUE NOT NULL,
       office INTEGER REFERENCES offices  ON DELETE CASCADE,
       party INTEGER REFERENCES parties ON DELETE CASCADE,
       candidate INTEGER REFERENCES users ON DELETE CASCADE,
       PRIMARY KEY (candidate,office)
   )`;
  const petitionTable = `CREATE TABLE IF NOT EXISTS petition(
      id SERIAL PRIMARY KEY,
      createdOn TIMESTAMP,
      createdBy INTEGER NOT NULL,
      office INTEGER NOT NULL,
      body VARCHAR(255) NOT NULL
   )`;

  const vote = `CREATE TABLE IF NOT EXISTS vote(
       id SERIAL UNIQUE NOT NULL,
       createdOn TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
       createdBy INTEGER REFERENCES users(id) ON DELETE CASCADE ,
       office INTEGER REFERENCES offices(id) ON DELETE CASCADE,
       candidate INTEGER REFERENCES candidates(id) ON DELETE CASCADE,
       PRIMARY KEY (office, createdBy)

   )`;

  const execQuery = `${partyTable}; ${officeTable}; ${userTable}; ${candidateTable}; ${petitionTable}; ${vote}; `;


  pool.query(execQuery)
  // eslint-disable-next-line no-unused-vars
    .then((results) => {
      pool.end();
    })
    .catch((e) => {
      throw e;
    });
};


// eslint-disable-next-line import/prefer-default-export
export { create };

require('make-runnable');
