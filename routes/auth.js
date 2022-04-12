const controller = require("../controllers/auth");
const validateSignUp = require("../middlewares/validateSignUp");
const checkToken = require("../middlewares/checkToken");

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      "Access-control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/signup", validateSignUp, controller.signUp);
  app.post("/api/signin", controller.signIn);
  app.post("/api/signout", controller.signOut);
  app.post("/api/checkisauth", controller.checkIsAuth);
};
