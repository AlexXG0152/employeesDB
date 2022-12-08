import { create, send } from "../controllers/employeePrintForms.controller";
import authJwt from "../middlewares/authJwt";
import { Router } from "express";

const printFormsRouter = Router();

printFormsRouter.post("/api/employee/:id/print-forms", create);
printFormsRouter.get("/api/employee/:id/print-forms/:fileName", send);


export default printFormsRouter;
