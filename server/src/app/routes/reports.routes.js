const reportsController = require("../controllers/reports.controller");
const { authJwt } = require("../middlewares");

module.exports = function (app) {
  app.get("/api/reports/todayBirtdays/:dateValue", reportsController.todayBirthdays);
};
