import { Router } from "express";
import userRouter from "./user.routes.js";
import authRouter from "./auth.routes.js";
import uploadRouter from "./upload.routes.js";
import reportsRouter from "./reports.routes.js";
import printFormsRouter from "./employeePrintForms.routes.js";
import employeeGrowthPlanRouter from "./employeeGrowthPlan.routes.js";
import employeeFamilyRouter from "./employeeFamily.routes.js";
import employeeEducationRouter from "./employeeEducation.routes.js";
import employeeRouter from "./employee.routes.js";

const router = Router();
router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
  });
router.use(userRouter);
router.use(authRouter);
router.use(uploadRouter);
router.use(reportsRouter);
router.use(printFormsRouter);
router.use(employeeGrowthPlanRouter);
router.use(employeeFamilyRouter);
router.use(employeeEducationRouter);
router.use(employeeRouter);

export default router;
