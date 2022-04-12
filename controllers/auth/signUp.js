const db = require('../../models');
const User = db.User;
const jwt = require('jsonwebtoken');
const cryptoJS = require('crypto-js');
const config = require('../../config/auth.config');

const signUp = async (req, res, next) => {
  try {
    const {email, password} = req.body;

    const foundUser = await User.findOne({
      where: {
        email: email,
      },
    });

    if (foundUser) {
      return res.status(409).json('Email is already in use');
    }

    const newUser = await User.create({
      email: email,
      password: cryptoJS.AES.encrypt(password, config.secret).toString(),
    });

    res.json(newUser);
  } catch (error) {
    next(error);
  }
};

module.exports = signUp;
