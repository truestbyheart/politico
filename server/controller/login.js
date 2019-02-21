import { compareSync } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'custom-env';
import pool from '../model/connection';

const env = process.env.NODE_ENV || 'development';
const cleanEnv = env.replace(/ /g, '');
dotenv.env(cleanEnv);

const login = ({ body }, res) => {
  const { email, password } = body;

  pool.query('SELECT * FROM users WHERE email=$1', [email])
    .then((results) => {
      if (results.rowCount === 0) {
        res.status(404).json({
          status: 404,
          message: 'Invalid email',
        });
      } else {
        const hashedpassword = results.rows[0].password;
        const isAdmin = results.rows[0].isadmin;
        const passwordCheck = compareSync(password, hashedpassword);
        if (passwordCheck) {
          const token = jwt.sign({ email, isAdmin }, process.env.HASH, { expiresIn: '24h' });
          if (token) {
            res.status(200).json({
              status: 200,
              token,
              user: { email, isAdmin },
            });
          } else {
            res.status(500).json({
              status: 500,
              message: 'Failed to create access token,try again letter',
            });
          }
        }
      }
    });
};

export default login;
