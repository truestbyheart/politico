import pool from '../model/connection';

const vote = (req, res) => {
  const { user, candidate, office } = req.body;

  const query = 'INSERT INTO vote(createdby,office,candidate) VALUES ($1,$2,$3)';

  pool.query(query, [user, office, candidate])
    .then((results) => {
      if (results.rowCount === 1) {
        res.status(201).json({
          status: 201,
          message: 'Thanks for voting',
          data: req.body,
        });
      }
    })
    .catch((e) => {
      res.status(403).json({
        status: 403,
        message: 'You have already voted for this office',
      });
    });
};

export default vote;
