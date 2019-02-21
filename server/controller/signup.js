import { genSaltSync, hashSync } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import dotenv from 'custom-env';
import pool from '../model/connection';
import { isMissingValue } from '../helper/helper';

const env = process.env.NODE_ENV || 'development';
const cleanEnv = env.replace(/ /g, '');
dotenv.env(cleanEnv);

const singUp = ({ body }, res) => {
  const firstname = body.firstname.trim();
  const lastname = body.lastname.trim();
  const othername = body.othername.trim();
  const password = body.password.trim();
  const email = body.email.trim();
  const { phonenumber } = body;
  const passporturl = body.passporturl.trim();
  const cleanBody = {
    firstname, lastname, othername, password, email, phonenumber, passporturl,
  };

  const response = isMissingValue(cleanBody);
  if (!response) {
    pool.query('SELECT * FROM users WHERE email=$1 AND phonenumber=$2', [email, phonenumber])
      .then((results) => {
        if (results.rowCount === 0) {
          const hash = hashSync(password, genSaltSync(10));
          if (hash) {
            const insertQuery = `INSERT INTO users(
                firstname,lastname,othername,password,email,phonenumber,passporturl
            ) VALUES(
                $1,$2,$3,$4,$5,$6,$7
            )`;
            pool.query(insertQuery,
              [firstname, lastname, othername, hash, email, phonenumber, passporturl])
              .then((results) => {
                if (results.rowCount === 1) {
                  if (results.rowCount === 1) {
                    const token = sign({ email, isAdmin: false }, process.env.HASH, { expiresIn: '24h' });
                    res.status(201).json({
                      status: 201,
                      token,
                      data: cleanBody,
                    });
                  } else {
                    res.status(500).json({
                      status: 500,
                      message: 'Account was not created, please try again later',
                    });
                  }
                } else {
                  res.status(500).json({
                    status: 500,
                    message: 'Failured to insert information to database',
                  });
                }
              });
          }
        } else {
          res.status(409).json({
            status: 409,
            message: 'User already exists',
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

export default singUp;
