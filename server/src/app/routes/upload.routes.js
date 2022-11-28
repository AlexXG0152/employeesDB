const uploadController = require("../controllers/upload.controller");
const { authJwt } = require("../middlewares");

module.exports = function (app) {
  app.post("/upload", uploadController.uploadFiles);
  app.get("/files", uploadController.getListFiles);
  app.get("/files/:name", uploadController.download);
};
