const {check, validationResult} = require('express-validator');

const validateSignUp = [
  check('email').isEmail(),
  check('password').isLength({min: 8}),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorsObj = errors.array();
      let message;
      if (errorsObj[0].param === 'email') {
        message = 'Invalid email address';
      }
      if (errorsObj[0].param === 'password') {
        message = 'Password should be longer than 8 symbols';
      }
      if (errorsObj[0].param === 'username') {
        message = 'Enter a valid date';
      }
      return res.status(400).json(errorsObj);
    } else {
      next();
    }
  },
];

module.exports = validateSignUp;
