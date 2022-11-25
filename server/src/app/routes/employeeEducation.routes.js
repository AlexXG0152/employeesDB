const controller = require("../controllers/employeeEducation.controller");
const { authJwt } = require("../middlewares");

module.exports = function (app) {
  app.get(
    "/api/employee/:id/education",
    [authJwt.verifyToken],
    controller.getOneByID
  );

  app.post(
    "/api/employee/:id/education",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.createOne
  );

  app.patch(
    "/api/employee/:id/education",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.updateOne
  );

  app.delete(
    "/api/employee/:id/education",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.deleteOnefromDB
  );
};
