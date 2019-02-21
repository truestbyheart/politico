
import { verify } from 'jsonwebtoken';

const jwtVerifier = (req, res, next) => {
  const bearerHeader = req.headers.authorization;
  if (bearerHeader !== undefined) {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    const decoded = verify(bearerToken, process.env.HASH);
    if (!decoded) {
      res.status(401).json({
        status: 401,
        message: 'please check your token or make sure your authorized',
      });
    } else {
      req.userData = decoded;
    }

    next();
  } else {
    res.status(401).json({
      status: 401,
      message: 'please check your token for expiration or make sure your authorized',
    });
  }
};

export default jwtVerifier;
