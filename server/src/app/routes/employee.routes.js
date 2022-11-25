const controller = require("../controllers/employee.controller");
const { authJwt } = require("../middlewares");

module.exports = function (app) {
  app.get("/api/employee/:id", [authJwt.verifyToken], controller.getOneByID);
  app.get(
    "/api/employee/firstName/:firstName",
    [authJwt.verifyToken],
    controller.getAllByFirstName
  );

  app.post(
    "/api/employee/",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.createOne
  );

  app.patch(
    "/api/employee/:id",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.updateOne
  );

  app.delete(
    "/api/employee/:id",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.deleteOnefromDB
  );
};
