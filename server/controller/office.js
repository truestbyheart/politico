import {
  isMissingValue,
  officeEntityValidator,
  officePropertySpecs,
} from '../helper/helper';
import pool from '../model/connection';


export const postOffice = ({ body }, res) => {
  if (officeEntityValidator(body)) {
    // check for empty values
    const response = isMissingValue(body);
    if (!response) {
      // check for duplication
      const query = 'SELECT * FROM offices WHERE name=$1';

      pool.query(query, [body.name])
        .then((results) => {
          if (results.rowCount > 0) {
            res.status(200).json({ status: 200, message: 'The office already exists' });
          } else {
            // insert new data
            const insQuery = 'INSERT INTO offices(name,type) VALUES($1,$2)';
            pool.query(insQuery, [body.name, body.type])
              // eslint-disable-next-line no-unused-vars
              .then((results) => {
                if (results.rowCount === 1) {
                  res.status(201).json({
                    status: 201,
                    message: 'office created successfully',
                  });
                }
              })
              .catch((e) => {
                throw e;
              });
          }
        })
        .catch((e) => { throw e; });
    } else {
      res.status(200).json({
        status: 200,
        message: response,
      });
    }
  } else {
    const missings = officePropertySpecs(body);
    res.status(200).json({
      status: 200,
      message: missings,
    });
  }
};

export const getOffices = (req, res) => {
  const getQuery = 'SELECT * FROM offices';

  pool.query(getQuery)
    .then((results) => {
      if (results.rowCount === 0) {
        res.status(404).json({
          status: 404,
          message: 'There are no offices at the moment',
        });
      } else {
        res.status(200).json({
          status: 200,
          data: results.rows,
        });
      }
    })
    .catch((e) => {
      throw e;
    });
};

export const getOffice = (req, res) => {
  const getQuery = 'SELECT * FROM offices WHERE id=$1';
  const { id } = req.params;

  pool.query(getQuery, [id])
    .then((results) => {
      if (results.rowCount === 0) {
        res.status(404).json({
          status: 404,
          message: 'There is no office with the specified ID',
        });
      } else {
        res.status(200).json({
          status: 200,
          data: results.rows,
        });
      }
    });
};

export const editOffice = (req, res) => {
  const { id } = req.params;
  const editQuery = 'UPDATE offices SET name=$1, type=$2 WHERE id=$3';
  const {
    name, type,
  } = req.body;
  // check for empty values
  const response = isMissingValue(req.body);
  if (!response) {
    // check for duplicates
    const findDuplacate = 'SELECT * FROM offices WHERE name =$1';
    pool.query(findDuplacate, [name])
      .then((results) => {
        if (results.rowCount === 0) {
          // insert the new data
          pool.query(editQuery, [name, type, id])
            .then((results) => {
              if (results === 0) {
                res.status(200).json({
                  status: 200,
                  message: 'There is no office with the specified ID',
                });
              } else {
                const getQuery = 'SELECT * FROM offices WHERE id=$1';
                pool.query(getQuery, [id])
                  .then((results) => {
                    res.status(200).json({
                      status: 200,
                      data: results.rows,
                    });
                  });
              }
            })
            .catch((e) => { throw e; });
        } else {
          res.status(200).json({
            status: 200,
            message: 'The office already exists',
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


export const deleteOffice = (req, res) => {
  const { id } = req.params;
  const deleteQuery = 'DELETE FROM offices WHERE id=$1';

  pool.query(deleteQuery, [id])
    .then((results) => {
      if (results.rowCount === 0) {
        res.status(404).json({
          status: 404,
          message: 'There is no office with the specified ID',
        });
      } else {
        res.status(200).json({
          status: 200,
          message: 'The office has been deleted successfully',
        });
      }
    });
};
