const mockData = require('../../mockData/mockData');

const getHome = async (req, res) => {
  try {
    res.status(200).json(mockData.home);
  } catch (error) {
    res.json(error);
  }
};

module.exports = getHome;
