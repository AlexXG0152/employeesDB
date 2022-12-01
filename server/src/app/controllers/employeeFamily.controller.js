const asyncHandler = require("express-async-handler");
const { mongo } = require("mongoose");

const FamilyMembers = require("../models/employeeFamily.model");

exports.getOneByID = asyncHandler(async (req, res) => {
  try {
    if (!req.params.id) {
      res.status(400);
      throw new Error("Please add employeeID");
    }
    const employeesFamilyMembers = await FamilyMembers.find({
      employeeID: Number(req.params.id),
    });
    res.json(employeesFamilyMembers);
  } catch (error) {
    return res.status(200).send({ error });
  }
});

exports.createOne = asyncHandler(async (req, res) => {
  try {
    if (!req.body.details) {
      res.status(400);
      throw new Error("No createQuery data in request");
    }
    const employeesFamilyMembers = await FamilyMembers.create(
      req.body.details
    );
    res.json(employeesFamilyMembers);
  } catch (error) {
    return res.status(200).send({ error });
  }
});

exports.updateOne = asyncHandler(async (req, res) => {
  try {
    if (!req.params.id) {
      res.status(404);
      throw new Error("No employeeID in request");
    }
    if (!req.body.details) {
      res.status(400);
      throw new Error("No updateQuery data in request");
    }

    const employeesFamilyMembers = await FamilyMembers.findOneAndUpdate(
      {
        _id: new mongo.ObjectId(req.body._id),
      },
      req.body.details,
      { new: true }
    );
    res.json(employeesFamilyMembers);
  } catch (error) {
    return res.status(200).send({ error });
  }
});

exports.deleteOnefromDB = asyncHandler(async (req, res) => {
  try {
    if (!req.params.id) {
      res.status(404);
      throw new Error("No employeeID in request");
    }
    if (!req.body._id) {
      res.status(404);
      throw new Error("No '_id' in request");
    }
    const employeesFamilyMembers = await FamilyMembers.findOneAndRemove({
      _id: new mongo.ObjectId(req.body._id),
    });
    res.json(employeesFamilyMembers);
  } catch (error) {
    return res.status(200).send({ error });
  }
});
