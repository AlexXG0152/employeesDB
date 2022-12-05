import asyncHandler from "express-async-handler";

import Employee from "../models/employee.model";

export const getAllByFirstName = asyncHandler(async (req, res) => {
  try {
    if (!req.params.firstName) {
      res.status(400);
      throw new Error("Please add firstName");
    }
    const employees = await Employee.find({ firstName: req.params.firstName });
    res.json(employees);
  } catch (error) {
    return res.status(200).send({ error });
  }
});

export const getOneByID = asyncHandler(async (req, res) => {
  try {
    if (!req.params.id) {
      res.status(400);
      throw new Error("Please add employeeID");
    }
    const employee = await Employee.findOne({
      employeeID: Number(req.params.id),
    });
    res.json(employee);
  } catch (error) {
    return res.status(200).send({ error });
  }
});

export const createOne = asyncHandler(async (req, res) => {
  try {
    if (!req.body.details) {
      res.status(400);
      throw new Error("No createQuery data in request");
    }
    const employee = await Employee.create(req.body.details);
    res.json(employee);
  } catch (error) {
    return res.status(200).send({ error });
  }
});

export const updateOne = asyncHandler(async (req, res) => {
  try {
    if (!req.params.id) {
      res.status(404);
      throw new Error("No employeeID in request");
    }
    if (!req.body.details) {
      updateQuery.details = req.body.details;
    } else {
      res.status(400);
      throw new Error("No updateQuery data in request");
    }

    const employee = await Employee.findOneAndUpdate(
      { employeeID: Number(req.params.id) },
      req.body.details,
      { new: true }
    );
    res.json(employee);
  } catch (error) {
    return res.status(200).send({ error });
  }
});

export const deleteOnefromDB = asyncHandler(async (req, res) => {
  try {
    if (!req.params.id) {
      res.status(404);
      throw new Error("No employeeID in request");
    }
    const employee = await Employee.findOneAndRemove({
      employeeID: Number(req.params.id),
    });
    res.json(employee);
  } catch (error) {
    return res.status(200).send({ error });
  }
});
