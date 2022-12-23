import uploadController from "../controllers/upload.controller.js";
import authJwt from "../middlewares/authJwt.js";
import { Router } from "express";

const uploadRouter = Router();

uploadRouter.post(
  "/upload",
  // [(authJwt.verifyToken, authJwt.isModerator)],
  uploadController.uploadFiles
);
uploadRouter.get(
  "/files",
  // [authJwt.verifyToken, authJwt.isModerator],
  uploadController.getListFiles
);
uploadRouter.get(
  "/files/:name",
  // [authJwt.verifyToken, authJwt.isModerator],
  uploadController.download
);
uploadRouter.get(
  "/files/id/:id",
  // [authJwt.verifyToken, authJwt.isModerator],
  uploadController.getEmployeeFiles
);

export default uploadRouter;
