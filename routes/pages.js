const controller = require('../controllers/pages');
const checkToken = require('../middlewares/checkToken');

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      'Access-control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept',
    );
    next();
  });

  app.get('/home', checkToken, controller.getHome);
  app.get('/materials-review', checkToken, controller.getMaterials);
  app.get('/supplier-map', checkToken, controller.getMaps);
};
