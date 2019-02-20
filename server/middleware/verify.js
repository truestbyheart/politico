
import jwt from 'jsonwebtoken';

const jwtVerifier = (req, res, next) => {
  const bearerHeader = req.headers.authorization;
  if (bearerHeader !== undefined) {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    jwt.verify(bearerToken, process.env.HASH, (err, decoded) => {
      if (err) {
        res.sendStatus(403);
      } else {
        req.userData = decoded;
      }
    });
    next();
  } else {
    res.sendStatus(403);
  }
};

export default jwtVerifier;
