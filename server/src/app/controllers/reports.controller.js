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
  ];
  try {
    const todayBirthdays = await Employee.aggregate(agg);
    res.json(todayBirthdays);
  } catch (error) {
    return res.status(200).send({ error });
  }
});
