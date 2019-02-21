import pool from '../model/connection';

const result = (req, res) => {
  const { id } = req.params;
  const query = 'SELECT candidate,office,CAST(COUNT(*) AS Int) AS result FROM  vote WHERE office=$1 GROUP BY candidate,office';
  pool.query(query, [id])
    .then((results) => {
      if (results.rowCount > 0) {
        res.status(200).json({
          status: 200,
          data: results.rows,
        });
      } else {
        res.status(200).json({
          status: 200,
          message: 'There no results to display at the moment',
        });
      }
    });
};

export default result;
