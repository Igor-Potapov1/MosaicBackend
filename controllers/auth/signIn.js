const db = require('../../models');
const User = db.User;
const jwt = require('jsonwebtoken');
const cryptoJS = require('crypto-js');
const config = require('../../config/auth.config');

const signIn = async (req, res) => {
  try {
    const {email, password} = req.body;

    const targetUser = await User.findOne({
      where: {
        email: email,
      },
    });

    if (!targetUser) {
      res.clearCookie('token');
      return res.status(404).json('User not found');
    }

    const decrPass = cryptoJS.AES.decrypt(
      targetUser.password,
      config.secret,
    ).toString(cryptoJS.enc.Utf8);
    const passIsValid = password === decrPass;

    if (!passIsValid) {
      res.clearCookie('token');
      return res.status(401).json('Invalid password');
    }

    const token = jwt.sign({id: targetUser.id}, config.secret, {
      expiresIn: 86400,
    });

    res.cookie('token', token, {httpOnly: true});
    res.status(200).json(targetUser);
  } catch (error) {
    res.json(error);
  }
};

module.exports = signIn;
