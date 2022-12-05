import { Router } from "express";
import userRouter from "./user.routes";
import authRouter from "./auth.routes";
import uploadRouter from "./upload.routes";
import reportsRouter from "./reports.routes";
import printFormsRouter from "./employeePrintForms.routes";
import employeeGrowthPlanRouter from "./employeeGrowthPlan.routes";
import employeeFamilyRouter from "./employeeFamily.routes";
import employeeEducationRouter from "./employeeEducation.routes";
import employeeRouter from "./employee.routes";

const router = Router();
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
