import bcrypt from 'bcryptjs';
import pool from '../model/connection';
import { isMissingValue } from '../helper/helper';

const singUp = ({ body }, res) => {
  const {
    firstname, lastname, othername, password, email, phonenumber, passporturl,
  } = body;

  const response = isMissingValue(body);

  if (!response) {
    const checkDuplicate = 'SELECT * FROM users WHERE email=$1 AND phonenumber=$2';

    pool.query(checkDuplicate, [email, phonenumber])
      .then((results) => {
        if (results.rowCount === 0) {
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
              if (hash) {
                const insertFresh = `INSERT INTO users(
                firstname,lastname,othername,password,email,phonenumber,passporturl
            ) VALUES(
                $1,$2,$3,$4,$5,$6,$7
            )`;
                pool.query(insertFresh,
                  [firstname, lastname, othername, hash, email, phonenumber, passporturl])
                  .then((results) => {
                    if (results.rowCount === 1) {
                      if (results.rowCount === 1) {
                        res.status(200).json({
                          status: 200,
                          message: 'Account successfully created',
                        });
                      } else {
                        res.status(200).json({
                          status: 200,
                          message: 'Account was not created, please try again later',
                        });
                      }
                    } else {
                      res.status(500).json({
                        status: 500,
                        message: 'Failured to insert information to database',
                      });
                    }
                  })
                  .catch((e) => { throw e; });
              }
            });
          });
        } else {
          res.status(200).json({
            status: 200,
            message: 'User already exists',
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
};

export default singUp;
