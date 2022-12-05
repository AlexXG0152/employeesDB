const employeePrintForms = require("../controllers/employeePrintForms.controller");
const { authJwt } = require("../middlewares");

module.exports = function (app) {
  app.get("/api/employee/:id/print-forms", employeePrintForms.download);
};
