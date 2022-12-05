import {
  todayBirthdays,
  getFiredInThisYear,
  getHiredInThisYear,
} from "../controllers/reports.controller";
import authJwt from "../middlewares/authJwt";
import { Router } from "express";

const reportsRouter = Router();

reportsRouter.get("/api/reports/todayBirtdays/:dateValue", todayBirthdays);
reportsRouter.get(
  "/api/reports/getFiredInThisYear/:yearValue",
  getFiredInThisYear
);
reportsRouter.get(
  "/api/reports/getHiredInThisYear/:yearValue",
  getHiredInThisYear
);
export default reportsRouter;
