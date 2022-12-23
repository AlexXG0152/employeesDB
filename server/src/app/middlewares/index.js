import authJwt from "./authJwt";
import verifySignUp from "./verifySignUp";
import uploadFilesMiddleware from "./upload";
import morganMiddleware from "./morgan";
import { secure } from "./secure";

export default {
  authJwt,
  verifySignUp,
  uploadFilesMiddleware,
  morganMiddleware,
  secure
};
