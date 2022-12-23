import {
  getOneByID,
  createOne,
  updateOne,
  deleteOnefromDB,
} from "../controllers/employeeGrowthPlan.controller.js";
import authJwt from "../middlewares/authJwt.js";
import { Router } from "express";

const employeeGrowthPlanRouter = Router();

employeeGrowthPlanRouter.get(
  "/api/employee/:id/growth-plan",
  [authJwt.verifyToken],
  getOneByID
);

employeeGrowthPlanRouter.post(
  "/api/employee/:id/growth-plan",
  [authJwt.verifyToken, authJwt.isModerator],
  createOne
);

employeeGrowthPlanRouter.patch(
  "/api/employee/:id/growth-plan",
  [authJwt.verifyToken, authJwt.isModerator],
  updateOne
);

employeeGrowthPlanRouter.delete(
  "/api/employee/:id/growth-plan",
  [authJwt.verifyToken, authJwt.isModerator],
  deleteOnefromDB
);
export default employeeGrowthPlanRouter;
