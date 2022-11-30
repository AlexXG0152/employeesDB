const asyncHandler = require("express-async-handler");
const { mongo } = require("mongoose");

const EmployeesGrowthPlan = require("../models/employeeGrowthPlan.model");

exports.getOneByID = asyncHandler(async (req, res) => {
  if (!req.params.id) {
    res.status(400);
    throw new Error("Please add employeeID");
  }
  const employeesEducation = await EmployeesGrowthPlan.find({
    employeeID: Number(req.params.id),
  });
  res.json(employeesEducation);
});

exports.createOne = asyncHandler(async (req, res) => {
  const createQuery = {};
  if (req.body.details) {
    createQuery.details = req.body.details;
  } else {
    res.status(400);
    throw new Error("No createQuery data in request");
  }
  const employeesEducation = await EmployeesGrowthPlan.create(
    createQuery.details
  );
  res.json(employeesEducation);
});

exports.updateOne = asyncHandler(async (req, res) => {
  if (!req.params.id) {
    res.status(404);
    throw new Error("No employeeID in request");
  }

  const updateQuery = {};
  if (req.body.details) {
    updateQuery.details = req.body.details;
  } else {
    res.status(400);
    throw new Error("No updateQuery data in request");
  }

  const employeesEducation = await EmployeesGrowthPlan.findOneAndUpdate(
    {
      _id: new mongo.ObjectId(req.body._id),
    },
    updateQuery.details,
    { new: true }
  );
  res.json(employeesEducation);
});

exports.deleteOnefromDB = asyncHandler(async (req, res) => {
  if (!req.params.id) {
    res.status(404);
    throw new Error("No employeeID in request");
  }
  if (!req.body._id) {
    res.status(404);
    throw new Error("No '_id' in request");
  }
  const employeesEducation = await EmployeesGrowthPlan.findOneAndRemove({
    _id: new mongo.ObjectId(req.body._id),
  });
  res.json(employeesEducation);
});
