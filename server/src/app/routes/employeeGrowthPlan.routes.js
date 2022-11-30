const controller = require("../controllers/employeeGrowthPlan.controller");
const { authJwt } = require("../middlewares");

module.exports = function (app) {
  app.get(
    "/api/employee/:id/growth-plan",
    [authJwt.verifyToken],
    controller.getOneByID
  );

  app.post(
    "/api/employee/:id/growth-plan",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.createOne
  );

  app.patch(
    "/api/employee/:id/growth-plan",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.updateOne
  );

  app.delete(
    "/api/employee/:id/growth-plan",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.deleteOnefromDB
  );
};
