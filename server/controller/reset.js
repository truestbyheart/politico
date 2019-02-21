import pool from '../model/connection';

const reset = (req, res) => {
  const { email } = req.body;
  const verifyEmail = 'SELECT email FROM users WHERE email=$1';

  pool.query(verifyEmail, [email])
    .then((results) => {
      if (results.rowCount === 1) {
        res.status(200).json({
          status: 200,
          message: 'Check your email for password reset link',
          email,
        });
      } else {
        res.status(200).json({
          status: 200,
          message: 'Please use the email, you signed with',
        });
      }
    });
};

export default reset;
