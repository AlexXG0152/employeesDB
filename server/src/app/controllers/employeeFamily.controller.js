import asyncHandler from "express-async-handler";
import { createInDB, readFromDB, updateInDB, deleteFromDB } from "./commonEmployeeData.controller.js";

import FamilyMembers from "../models/employeeFamily.model.js";

export const getOneByID = asyncHandler(async (req, res) => {
  await readFromDB(req, res, FamilyMembers);
});

export const createOne = asyncHandler(async (req, res) => {
  await createInDB(req, res, FamilyMembers);
});

export const updateOne = asyncHandler(async (req, res) => {
  await updateInDB(req, res, FamilyMembers);
});

export const deleteOnefromDB = asyncHandler(async (req, res) => {
  await deleteFromDB(req, res, FamilyMembers);
});
