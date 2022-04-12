const signOut = async (req, res, next) => {
  try {
    res.clearCookie('token');

    res.status(200).json('Ok');
  } catch (error) {
    next(error);
  }
};

module.exports = signOut;
