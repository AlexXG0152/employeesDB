import {
  getOneByID,
  createOne,
  updateOne,
  deleteOnefromDB,
} from "../controllers/employeeEducation.controller";
import authJwt from "../middlewares/authJwt";
import { Router } from "express";

const employeeEducationRouter = Router();

employeeEducationRouter.get(
  "/api/employee/:id/education",
  [authJwt.verifyToken],
  getOneByID
);

employeeEducationRouter.post(
  "/api/employee/:id/education",
  [authJwt.verifyToken, authJwt.isModerator],
  createOne
);

employeeEducationRouter.patch(
  "/api/employee/:id/education",
  [authJwt.verifyToken, authJwt.isModerator],
  updateOne
);

employeeEducationRouter.delete(
  "/api/employee/:id/education",
  [authJwt.verifyToken, authJwt.isModerator],
  deleteOnefromDB
);

export default employeeEducationRouter;
