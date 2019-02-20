import bcrypt from 'bcryptjs';
import pool from '../model/connection';

const isAdmin = ({ userData }, res, next) => {
  const { email, password } = userData.body;
  if (userData !== undefined) {
    pool.query('SELECT * FROM users WHERE email=$1', [email])
      .then((response) => {
        if (response.rowCount === 1) {
          const hashedpasword = response.rows[0].password;

          bcrypt.compare(password, hashedpasword, (err, result) => {
            if (result && response.rows[0].isadmin) {
              next();
            } else {
              res.sendStatus(403);
            }
          });
        }
      });
  }
};

export default isAdmin;
