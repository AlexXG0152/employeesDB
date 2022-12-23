import asyncHandler from "express-async-handler";
import { createInDB, readFromDB, updateInDB, deleteFromDB } from "./commonEmployeeData.controller.js";

import EmployeesEducation from "../models/employeeEducation.model.js";

export const getOneByID = asyncHandler(async (req, res) => {
  await readFromDB(req, res, EmployeesEducation);
});

export const createOne = asyncHandler(async (req, res) => {
  await createInDB(req, res, EmployeesEducation);
});

export const updateOne = asyncHandler(async (req, res) => {
  await updateInDB(req, res, EmployeesEducation);
});

export const deleteOnefromDB = asyncHandler(async (req, res) => {
  await deleteFromDB(req, res, EmployeesEducation);
});
