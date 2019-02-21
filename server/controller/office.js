import {
  isMissingValue,
  officeEntityValidator,
  officePropertySpecs,
} from '../helper/helper';
import pool from '../model/connection';


export const postOffice = ({ body }, res) => {
  if (officeEntityValidator(body)) {
    const name = body.name.trim();
    const type = body.type.trim();
    const cleanBody = { name, type };
    // check for empty values
    const response = isMissingValue(cleanBody);
    if (!response) {
      // check for duplication
      pool.query('SELECT * FROM offices WHERE name=$1', [name])
        .then((results) => {
          if (results.rowCount === 1) {
            res.status(422).json({ status: 422, message: 'The office already exists' });
          } else {
            // insert new data
            pool.query('INSERT INTO offices(name,type) VALUES($1,$2)', [name, type])
              // eslint-disable-next-line no-unused-vars
              .then((results) => {
                if (results.rowCount === 1) {
                  res.status(201).json({
                    status: 201,
                    message: 'office created successfully',
                  });
                }
              });
          }
        });
    } else {
      res.status(415).json({
        status: 415,
        message: response,
      });
    }
  } else {
    const missings = officePropertySpecs(body);
    res.status(415).json({
      status: 415,
      message: missings,
    });
  }
};

export const getOffices = (req, res) => {
  const getQuery = 'SELECT * FROM offices';

  pool.query(getQuery)
    .then((results) => {
      if (results.rowCount === 0) {
        res.status(204).json({
          status: 204,
          message: 'There are no offices at the moment',
        });
      } else {
        res.status(200).json({
          status: 200,
          data: results.rows,
        });
      }
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

export const editOffice = ({ body,params}, res) => {
  const { id } = params;
  const name = body.name.trim();
  const type = body.type.trim();
  const cleanBody = { name, type };

  // check for empty values
  const response = isMissingValue(cleanBody);
  if (!response) {
    // check for duplicates
    pool.query('SELECT * FROM offices WHERE name =$1', [name])
      .then((results) => {
        if (results.rowCount === 0) {
          // insert the new data
          pool.query('UPDATE offices SET name=$1, type=$2 WHERE id=$3', [name, type, id])
            .then((results) => {
              if (results === 0) {
                res.status(404).json({
                  status: 404,
                  message: 'There is no office with the specified ID',
                });
              } else {
                pool.query('SELECT * FROM offices WHERE id=$1', [id])
                  .then((results) => {
                    res.status(200).json({
                      status: 200,
                      data: results.rows,
                    });
                  });
              }
            });
        } else {
          res.status(422).json({
            status: 422,
            message: 'The office already exists',
          });
        }
      });
  } else {
    res.status(422).json({
      status: 422,
      message: response,
    });
  }
};


export const deleteOffice = (req, res) => {
  const { id } = req.params;
  pool.query('DELETE FROM offices WHERE id=$1', [id])
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
