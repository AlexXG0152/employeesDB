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

import asyncHandler from "express-async-handler";
import aggregate from "../models/employee.model";

export const todayBirthdays = asyncHandler(async (req, res) => {
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
    const todayBirthdays = await aggregate(agg);
    res.json(todayBirthdays);
  } catch (error) {
    return res.status(400).send({ error });
  }
});

export const getFiredInThisYear = asyncHandler(async (req, res) => {
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
    const getFiredInThisYear = await aggregate(agg);
    res.json(getFiredInThisYear);
  } catch (error) {
    return res.status(400).send({ error });
  }
});

export const getHiredInThisYear = asyncHandler(async (req, res) => {
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
    const getHiredInThisYear = await aggregate(agg);
    res.json(getHiredInThisYear);
  } catch (error) {
    return res.status(400).send({ error });
  }
});
