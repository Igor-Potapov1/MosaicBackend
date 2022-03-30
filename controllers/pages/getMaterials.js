const mockData = require('../../mockData/mockData');

const getMaterials = async (req, res) => {
  try {
    res.status(200).json(mockData.materialReview);
  } catch (error) {
    res.json(error);
  }
};

module.exports = getMaterials;
