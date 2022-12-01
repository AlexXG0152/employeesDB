// import { MongoClient } from "mongodb";

// const agg = [
//   {
//     $match: {
//       birthDate: {
//         $regex: new RegExp("^01.12."),
//       },
//     },
//   },
// ];

// const client = await MongoClient.connect("", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// const coll = client.db("").collection("");
// const cursor = coll.aggregate(agg);
// const result = await cursor.toArray();
// await client.close();

const asyncHandler = require("express-async-handler");
const Employee = require("../models/employee.model");

exports.todayBirthdays = asyncHandler(async (req, res) => {
  const agg = [
    {
      $match: {
        birthDate: {
          $regex: new RegExp(req.params.dateValue),
        },
      },
    },
    {
      $project: {
        _id: 1,
        employeeID: 1,
        firstName: 1,
        lastName: 1,
        fatherName: 1,
        birthDate: 1,
      },
    },
  ];
  try {
    const todayBirthdays = await Employee.aggregate(agg);
    res.json(todayBirthdays);
  } catch (error) {
    return res.status(400).send({ error });
  }
});

exports.getFiredInThisYear = asyncHandler(async (req, res) => {
  const agg = [
    {
      $match: {
        dismissalDate: {
          $regex: new RegExp(req.params.yearValue),
        },
      },
    },
    {
      $project: {
        _id: 1,
        employeeID: 1,
        firstName: 1,
        lastName: 1,
        fatherName: 1,
        dismissalDate: 1,
        dismissalReason: 1,
      },
    },
  ];
  try {
    const getFiredInThisYear = await Employee.aggregate(agg);
    res.json(getFiredInThisYear);
  } catch (error) {
    return res.status(400).send({ error });
  }
});

exports.getHiredInThisYear = asyncHandler(async (req, res) => {
  const agg = [
    {
      $match: {
        employmentDate: {
          $regex: new RegExp(req.params.yearValue),
        },
      },
    },
    {
      $project: {
        _id: 1,
        employeeID: 1,
        firstName: 1,
        lastName: 1,
        fatherName: 1,
        employmentDate: 1,
      },
    },
  ];
  try {
    const getHiredInThisYear = await Employee.aggregate(agg);
    res.json(getHiredInThisYear);
  } catch (error) {
    return res.status(400).send({ error });
  }
});
