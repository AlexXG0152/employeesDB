const reportsController = require("../controllers/reports.controller");
const { authJwt } = require("../middlewares");

module.exports = function (app) {
  app.get("/api/reports/todayBirtdays/:dateValue", reportsController.todayBirthdays);
  app.get("/api/reports/getFiredInThisYear/:yearValue", reportsController.getFiredInThisYear);
  app.get("/api/reports/getHiredInThisYear/:yearValue", reportsController.getHiredInThisYear);
};
