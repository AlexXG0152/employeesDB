const uploadController = require("../controllers/upload.controller");
const { authJwt } = require("../middlewares");

module.exports = function (app) {
  app.post(
    "/upload",
    // [(authJwt.verifyToken, authJwt.isModerator)],
    uploadController.uploadFiles
  );
  app.get(
    "/files",
    // [authJwt.verifyToken, authJwt.isModerator],
    uploadController.getListFiles
  );
  app.get(
    "/files/:name",
    // [authJwt.verifyToken, authJwt.isModerator],
    uploadController.download
  );
};
