const jwt = require('jsonwebtoken');
const config = require('../config/auth.config.js');

const checkToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(403).json({
      message: 'No token provided',
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      res.clearCookie('token');
      return res.status(401).json({
        message: 'Unauthorized',
      });
    }

    req.userId = decoded.id;
    res.locals.userId = decoded.id;
    next();
  });
};

module.exports = checkToken;
