import pool from '../model/connection';
import { isMissingValue } from '../helper/helper';

const candidate = ({ body }, res) => {
  const { name, office, party } = body;
  const getIds = `SELECT id FROM offices WHERE name=$1
   UNION SELECT id FROM parties WHERE name=$2 
   UNION SELECT id FROM users WHERE lastname=$3`;
  // check for empty values
  const response = isMissingValue(body);

  if (!response) {
    pool.query(getIds, [office, party, name])
      .then((results) => {
        if (results.rowCount === 3) {
          // check for duplicates
          const duplicatecheck = 'SELECT * FROM candidates WHERE candidate=$1';
          pool.query(duplicatecheck, [results.rows[1].id])
            .then((results) => {
              if (results.rowCount === 1) {
                res.status(200).json({
                  status: 200,
                  message: 'candidate already exists',
                });
              } else {
                // insert data
                const insQuery = 'INSERT INTO candidates(office,party,candidate) VALUES($1,$2,$3)';
                pool.query(insQuery, [results.rows[3].id, results.rows[0].id, results.rows[1]].id)
                  .then((results) => {
                    if (results.rowCount === 1) {
                      res.status(201).json({
                        status: 201,
                        message: 'Candidate created successfully',
                      });
                    } else {
                      res.status(503).json({
                        status: 503,
                        message: 'Cant handle request please try again letter',
                      });
                    }
                  });
              }
            });
        } else {
          const unregistered = [];

          if (!body.hasOwnProperty('party')) { unregistered.push('party'); }
          if (!body.hasOwnProperty('name')) { unregistered.push('candidate'); }
          if (!body.hasOwnProperty('office')) { unregistered.push('office'); }

          res.status(404).json({
            status: 404,
            message: `the following are not registered on the system: ${unregistered}`,
          });
        }
      });
  } else {
    res.status(200).json({
      status: 200,
      message: response,
    });
  }
};

export default candidate;
