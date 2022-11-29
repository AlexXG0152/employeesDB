const authJwt = require("./authJwt");
const verifySignUp = require("./verifySignUp");
const uploadFilesMiddleware = require("./upload");

module.exports = {
  authJwt,
  verifySignUp,
  uploadFilesMiddleware
};
