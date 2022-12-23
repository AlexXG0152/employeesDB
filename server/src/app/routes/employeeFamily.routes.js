import {
  getOneByID,
  createOne,
  updateOne,
  deleteOnefromDB,
} from "../controllers/employeeFamily.controller.js";
import authJwt from "../middlewares/authJwt.js";
import morganMiddleware from "../middlewares/morgan.js"

import { Router } from "express";

const employeeFamilyRouter = Router();

employeeFamilyRouter.get(
  "/api/employee/:id/family",
  [authJwt.verifyToken],
  getOneByID
);

employeeFamilyRouter.post(
  "/api/employee/:id/family",
  [authJwt.verifyToken, authJwt.isModerator],
  createOne
);

employeeFamilyRouter.patch(
  "/api/employee/:id/family",
  [authJwt.verifyToken, authJwt.isModerator],
  updateOne
);

employeeFamilyRouter.delete(
  "/api/employee/:id/family",
  [authJwt.verifyToken, authJwt.isModerator],
  deleteOnefromDB
);
export default employeeFamilyRouter;
