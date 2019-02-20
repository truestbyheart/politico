import {
  partyEntityValidator,
  partyPropertySpecs,
  isMissingValue,
} from '../helper/helper';
import pool from '../model/connection';


// eslint-disable-next-line import/no-mutable-exports
export const Parties = [];

export const postParty = ({ body }, res) => {
  // check for entity specs
  if (partyEntityValidator(body)) {
    // check for empty values
    const response = isMissingValue(body);
    if (!response) {
      // check for duplication
      const query = 'SELECT * FROM parties WHERE name=$1 OR logourl=$2';

      pool.query(query, [body.name, body.logoUrl])
        .then((results) => {
          if (results.rowCount > 0) {
            res.status(200).json({ status: 200, message: 'The party already exists or your logo Url exists :-)' });
          } else {
          // insert new data
            const insQuery = 'INSERT INTO parties(name,hqaddress,logourl,abbreviation) VALUES($1,$2,$3,$4)';
            pool.query(insQuery, [body.name, body.hqAddress, body.logoUrl, body.abbreviation])
              // eslint-disable-next-line no-unused-vars
              .then((results) => {
                const query = 'SELECT * FROM parties WHERE name=$1';
                pool.query(query, [body.name])
                  .then((results) => {
                    if (results.rowCount === 1) {
                      res.status(201).json({
                        status: 201,
                        data: results.rows,
                      });
                    }
                  });
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
    const missings = partyPropertySpecs(body);
    res.status(200).json({
      status: 200,
      message: missings,
    });
  }
};


export const getParties = (req, res) => {
  const getQuery = 'SELECT * FROM parties';

  pool.query(getQuery)
    .then((results) => {
      if (results.rowCount === 0) {
        res.status(404).json({
          status: 404,
          message: 'There are no parties at the moment',
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


export const getParty = (req, res) => {
  const getQuery = 'SELECT * FROM parties WHERE id=$1';
  const { id } = req.params;

  pool.query(getQuery, [id])
    .then((results) => {
      if (results.rowCount === 0) {
        res.status(404).json({
          status: 404,
          message: 'There is no party with the specified ID',
        });
      } else {
        res.status(200).json({
          status: 200,
          data: results.rows,
        });
      }
    });
};

export const editParty = (req, res) => {
  const { id } = req.params;
  const editQuery = 'UPDATE parties SET name=$1, hqaddress=$2, logourl=$3, abbreviation=$4 WHERE id=$5';
  const {
    name, hqAddress, logoUrl, abbreviation,
  } = req.body;
  const response = isMissingValue(req.body);

  if (!response) {
    const findDuplacate = 'SELECT * FROM parties WHERE name =$1 AND logourl=$2';
    pool.query(findDuplacate, [name, logoUrl])
      .then((results) => {
        if (results.rowCount === 0) {
          pool.query(editQuery, [name, hqAddress, logoUrl, abbreviation, id])
            .then((results) => {
              if (results === 0) {
                res.status(200).json({
                  status: 200,
                  message: 'There is no party with the specified ID',
                });
              } else {
                const getQuery = 'SELECT * FROM parties WHERE id=$1';
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
            message: 'The party already exists or your logo Url exists: -)',
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


export const deleteParty = (req, res) => {
  const { id } = req.params;
  const deleteQuery = 'DELETE FROM parties WHERE id=$1';

  pool.query(deleteQuery, [id])
    .then((results) => {
      if (results.rowCount === 0) {
        res.status(404).json({
          status: 404,
          message: 'There is no party with the specified ID',
        });
      } else {
        res.status(200).json({
          status: 200,
          message: 'The party has been deleted successfully',
        });
      }
    });
};
