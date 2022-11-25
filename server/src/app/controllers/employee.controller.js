const asyncHandler = require("express-async-handler");

const Employee = require("../models/employee.model");

exports.getAllByFirstName = asyncHandler(async (req, res) => {
  if (!req.params.firstName) {
    res.status(400);
    throw new Error("Please add firstName");
  }
  const employees = await Employee.find({ firstName: req.params.firstName });
  res.json(employees);
});

exports.getOneByID = asyncHandler(async (req, res) => {
  if (!req.params.id) {
    res.status(400);
    throw new Error("Please add employeeID");
  }
  const employee = await Employee.findOne({
    employeeID: Number(req.params.id),
  });
  res.json(employee);
});

exports.createOne = asyncHandler(async (req, res) => {
  const createQuery = {};
  if (req.body.details) {
    createQuery.details = req.body.details;
  } else {
    res.status(400);
    throw new Error("No createQuery data in request");
  }
  const employee = await Employee.create(createQuery.details);
  res.json(employee);
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

  const employee = await Employee.findOneAndUpdate(
    { employeeID: Number(req.params.id) },
    updateQuery.details,
    { new: true }
  );
  res.json(employee);
});

exports.deleteOnefromDB = asyncHandler(async (req, res) => {
  if (!req.params.id) {
    res.status(404);
    throw new Error("No employeeID in request");
  }
  const employee = await Employee.findOneAndRemove({
    employeeID: Number(req.params.id),
  });
  res.json(employee);
});
