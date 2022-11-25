const mongoose = require("mongoose");

const EmployeesEducation = mongoose.model(
  "EmployeesEducation",
  new mongoose.Schema(
    {
      employeeID: {
        type: "Number",
      },
      educationLevel: {
        type: "Number",
      },
      educationType: {
        type: "String",
      },
      educationCenterName: {
        type: "String",
      },
      educationProfile: {
        type: "String",
      },
      educationDegree: {
        type: "String",
      },
      educationDateEnd: {
        type: "Date",
      },
      educationDiplomaNumber: {
        type: "String",
      },
      educationDiplomaDate: {
        type: "Date",
      },
    },
    { timestamps: true }
  )
);

module.exports = EmployeesEducation;
