import {
  getOneByID,
  getAllByFirstName,
  createOne,
  updateOne,
  deleteOnefromDB,
  getMaxID,
} from "../controllers/employee.controller";
import authJwt from "../middlewares/authJwt";

import { Router } from "express";

const employeeRouter = Router();

employeeRouter.get("/api/employee/getMaxEmployeeID", [authJwt.verifyToken], getMaxID)
employeeRouter.get("/api/employee/:id", [authJwt.verifyToken], getOneByID);
employeeRouter.get(
  "/api/employee/firstName/:firstName",
  [authJwt.verifyToken],
  getAllByFirstName
);

employeeRouter.post(
  "/api/employee/",
  [authJwt.verifyToken, authJwt.isModerator],
  createOne
);

employeeRouter.patch(
  "/api/employee/:id",
  [authJwt.verifyToken, authJwt.isModerator],
  updateOne
);

employeeRouter.delete(
  "/api/employee/:id",
  [authJwt.verifyToken, authJwt.isModerator],
  deleteOnefromDB
);

export default employeeRouter;
