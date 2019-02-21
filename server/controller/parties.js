import {
  partyEntityValidator,
  partyPropertySpecs,
  isMissingValue,
} from '../helper/helper';
import pool from '../model/connection';

export const postParty = ({ body }, res) => {
  // check for entity specs
  if (partyEntityValidator(body)) {
    const name = body.name.trim();
    const hqAddress = body.hqAddress.trim();
    const logoUrl = body.logoUrl.trim();
    const abbreviation = body.abbreviation.trim();
    const cleanBody = {
      name, hqAddress, logoUrl, abbreviation,
    };
    // check for empty values
    const response = isMissingValue(cleanBody);
    if (!response) {
      // check for duplication
      pool.query('SELECT * FROM parties WHERE name=$1 OR logourl=$2', [name, logoUrl])
        .then((results) => {
          if (results.rowCount === 1) {
            res.status(200).json({ status: 200, message: 'The party already exists or your logo Url exists :-)' });
          } else {
          // insert new data
            pool.query('INSERT INTO parties(name,hqaddress,logourl,abbreviation) VALUES($1,$2,$3,$4)',
              [name, hqAddress, logoUrl, abbreviation])
              // eslint-disable-next-line no-unused-vars
              .then((results) => {
                pool.query('SELECT * FROM parties WHERE name=$1', [name])
                  .then((results) => {
                    if (results.rowCount === 1) {
                      res.status(201).json({
                        status: 201,
                        data: results.rows,
                      });
                    }
                  });
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
    const missings = partyPropertySpecs(body);
    res.status(415).json({
      status: 415,
      message: missings,
    });
  }
};


export const getParties = (req, res) => {
  pool.query('SELECT * FROM parties')
    .then((results) => {
      if (results.rowCount === 0) {
        res.status(204).json({
          status: 204,
          message: 'There are no parties at the moment',
        });
      } else {
        res.status(200).json({
          status: 200,
          data: results.rows,
        });
      }
    });
};


export const getParty = (req, res) => {
  const { id } = req.params;
  pool.query('SELECT * FROM parties WHERE id=$1', [id])
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

export const editParty = ({ body, params }, res) => {
  const name = body.name.trim();
  const hqAddress = body.hqAddress.trim();
  const logoUrl = body.logoUrl.trim();
  const abbreviation = body.abbreviation.trim();
  const cleanBody = {
    name, hqAddress, logoUrl, abbreviation,
  };
  const response = isMissingValue(cleanBody);
  const { id } = params;
  if (!response) {
    pool.query('SELECT * FROM parties WHERE name =$1 AND logourl=$2', [name, logoUrl])
      .then((results) => {
        if (results.rowCount === 0) {
          pool.query('UPDATE parties SET name=$1, hqaddress=$2, logourl=$3, abbreviation=$4 WHERE id=$5',
            [name, hqAddress, logoUrl, abbreviation, id])
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
            });
        } else {
          res.status(422).json({
            status: 422,
            message: 'The party already exists or your logo Url exists: -)',
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


export const deleteParty = (req, res) => {
  const { id } = req.params;

  pool.query('DELETE FROM parties WHERE id=$1', [id])
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
