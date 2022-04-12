const db = require('../../models');
const User = db.User;
const jwt = require('jsonwebtoken');
const cryptoJS = require('crypto-js');
const config = require('../../config/auth.config');

const checkIsAuth = async (req, res, next) => {
  try {
    const {token} = req.cookies;

    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        res.clearCookie('token');
        return res.status(401).json({
          message: 'Unauthorized',
        });
      } else {
        res.status(200).json('Ok');
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = checkIsAuth;
