const mongoose = require("mongoose");

const EmployeesEducation = mongoose.model(
  "EmployeesEducation",
  new mongoose.Schema(
    {
      employeeID: {
        type: "Number",
        required: true,
      },
      educationLevel: {
        type: "Number",
        required: true,
      },
      educationType: {
        type: "String",
        required: true,
      },
      educationCenterName: {
        type: "String",
        required: true,
      },
      educationProfile: {
        type: "String",
        required: true,
      },
      educationDegree: {
        type: "String",
        required: true,
      },
      educationDateEnd: {
        type: "String",
        required: true,
      },
      educationDiplomaNumber: {
        type: "String",
        required: true,
      },
      educationDiplomaDate: {
        type: "String",
        required: true,
      },
    },
    { timestamps: true }
  )
);

module.exports = EmployeesEducation;
