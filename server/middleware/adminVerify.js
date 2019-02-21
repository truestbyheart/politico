const isAdmin = ({ userData }, res, next) => {
  const { isAdmin } = userData;
  if (isAdmin) {
    next();
  } else {
    res.status(401).json({
      status: 401,
      message: 'Your not authorized to make changes to this fields',
    });
  }
};

export default isAdmin;
