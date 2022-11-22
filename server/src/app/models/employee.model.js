const mongoose = require("mongoose");

const Employee = mongoose.model(
  "Employee",
  new mongoose.Schema(
    {
      employeeID: {
        type: "Number",
        required: true,
      },
      firstName: {
        type: "String",
        required: true,
      },
      lastName: {
        type: "String",
        required: true,
      },
      fatherName: {
        type: "String",
      },
      sex: {
        type: "String",
      },
      birthDate: {
        type: "String",
        required: true,
      },
      nationality: {
        type: "String",
      },
      tradeUnionName: {
        type: "String",
      },
      homeAddress: {
        type: "String",
      },
      date0: {
        type: "String",
      },
      date1: {
        type: "String",
      },
      dismissalDate: {
        type: "String",
      },
      employmentDate: {
        type: "String",
        required: true,
      },
      passportDateStart: {
        type: "String",
      },
      dismissalReason: {
        type: "String",
      },
      dismissalDocNumer: {
        type: "String",
      },
      dismissalDocDate: {
        type: "String",
      },
      education: {
        type: "String",
      },
      passportNumber: {
        type: "String",
      },
      passportMade: {
        type: "String",
      },
      personalNumber: {
        type: "String",
        required: true,
      },
      addressindex: {
        type: "String",
      },
      phoneNumber: {
        type: "String",
      },
      smtn0: {
        type: "String",
      },
      smtn1: {
        type: "String",
      },
      smtn2: {
        type: "String",
      },
      smtn3: {
        type: "String",
      },
    },
    { timestamps: true }
  )
);

module.exports = Employee;
