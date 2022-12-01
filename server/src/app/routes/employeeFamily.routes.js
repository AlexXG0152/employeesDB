const controller = require("../controllers/employeeFamily.controller");
const { authJwt } = require("../middlewares");

module.exports = function (app) {
  app.get(
    "/api/employee/:id/family",
    [authJwt.verifyToken],
    controller.getOneByID
  );

  app.post(
    "/api/employee/:id/family",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.createOne
  );

  app.patch(
    "/api/employee/:id/family",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.updateOne
  );

  app.delete(
    "/api/employee/:id/family",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.deleteOnefromDB
  );
};
