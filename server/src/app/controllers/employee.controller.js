import asyncHandler from "express-async-handler";
import Employee from "../models/employee.model.js";
import { updateInDB, deleteFromDB } from "./commonEmployeeData.controller.js";

export const getAllByFirstOrLastName = asyncHandler(async (req, res) => {
  try {
    const search = new RegExp(req.params.firstName, "i");
    const employees = await Employee.find({
      $or: [{ firstName: search }, { lastName: search }],
    });
    res.json(employees);
  } catch (error) {
    return res.status(200).send({ error });
  }
});

export const getOneByID = asyncHandler(async (req, res) => {
  try {
    const employee = await Employee.findOne({
      employeeID: Number(req.params.id),
    });
    if (!employee) {
      res.status(400).send({ error: "Provide right employeeID" });
    } else {
      res.json(employee);
    }
  } catch (error) {
    return res.status(200).send({ error });
  }
});

export const getMaxID = asyncHandler(async (req, res) => {
  try {
    const maxID = await Employee.find({}, { employeeID: 1, _id: 0 })
      .sort({ employeeID: -1 })
      .limit(1);
    res.json(maxID);
  } catch (error) {
    return res.status(200).send({ error });
  }
});

export const createOne = asyncHandler(async (req, res) => {
  try {
    const employee = await Employee.create(req.body.details);
    res.json(employee);
  } catch (error) {
    return res.status(200).send({ error });
  }
});

export const updateOne = asyncHandler(async (req, res) => {
  await updateInDB(req, res, Employee);
});

export const deleteOnefromDB = asyncHandler(async (req, res) => {
  await deleteFromDB(req, res, Employee);
});
