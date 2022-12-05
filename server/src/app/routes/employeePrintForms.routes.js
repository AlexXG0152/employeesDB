import { download } from "../controllers/employeePrintForms.controller";
import authJwt from "../middlewares/authJwt";
import { Router } from "express";

const printFormsRouter = Router();

printFormsRouter.get("/api/employee/:id/print-forms", download);

export default printFormsRouter;
