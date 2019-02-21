import pool from '../model/connection';

const candidate = (req, res) => {
  const { id } = req.params;
  const { party, user } = req.body;

  // check duplicate
  const duplcheck = 'SELECT * FROM candidates WHERE candidate=$1';
  pool.query(duplcheck, [user])
    .then((results) => {
      if (results.rowCount === 0) {
        const query = `INSERT INTO candidates(office,party,candidate)
                       VALUES ($1,$2,$3)`;

        pool.query(query, [id, party, user])
          .then((results) => {
            if (results.rowCount === 1) {
              res.status(201).json({
                status: 201,
                message: 'candidate has been created successfully',
                data: req.body,
              });
            }
          })
          // eslint-disable-next-line no-unused-vars
          .catch((e) => {
            res.status(201).json({
              status: 201,
              message: 'Check if the information is registered on the system',
            });
          });
      } else {
        res.status(409).json({
          status: 409,
          message: 'candidate already exists',
        });
      }
    });
};

export default candidate;
