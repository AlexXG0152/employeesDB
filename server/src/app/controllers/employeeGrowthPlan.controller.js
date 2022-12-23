import asyncHandler from "express-async-handler";
import {
  createInDB,
  readFromDB,
  updateInDB,
  deleteFromDB,
} from "./commonEmployeeData.controller.js";

import GrowthPlan from "../models/employeeGrowthPlan.model.js";

export const getOneByID = asyncHandler(async (req, res) => {
  await readFromDB(req, res, GrowthPlan);
});

export const createOne = asyncHandler(async (req, res) => {
  await createInDB(req, res, GrowthPlan);
});

export const updateOne = asyncHandler(async (req, res) => {
  await updateInDB(req, res, GrowthPlan);
});

export const deleteOnefromDB = asyncHandler(async (req, res) => {
  await deleteFromDB(req, res, GrowthPlan);
});
