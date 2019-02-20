import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'custom-env';
import pool from '../model/connection';

const env = process.env.NODE_ENV || 'development';
const cleanEnv = env.replace(/ /g, '');
dotenv.env(cleanEnv);

const login = ({ body }, res) => {
  const { email, password } = body;
  const query = 'SELECT * FROM users WHERE email=$1';

  pool.query(query, [email])
    .then((results) => {
      if (results.rowCount === 0) {
        res.status(404).json({
          status: 404,
          message: 'email doesn\'t exist',
        });
      } else {
        const hashedpassword = results.rows[0].password;
        const isAdmin = results.rows[0].isadmin;
        bcrypt.compare(password, hashedpassword, (err, result) => {
          if (result) {
            jwt.sign({ body }, process.env.HASH, { expiresIn: '24h' }, (err, token) => {
              if (isAdmin) {
                res.status(200).json({
                  status: 200,
                  token,
                  page: 'admin',
                });
              } else {
                res.status(200).json({
                  status: 200,
                  page: 'user',
                  token,
                });
              }
            });
          }
        });
      }
    });
};

export default login;
