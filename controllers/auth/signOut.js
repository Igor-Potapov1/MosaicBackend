const signOut = async (req, res) => {
  try {
    res.clearCookie('token');

    res.status(200).json('Ok');
  } catch (error) {
    res.json(error);
  }
};

module.exports = signOut;
