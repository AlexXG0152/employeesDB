import { model, Schema } from "mongoose";

const EmployeesEducation = model(
  "EmployeesEducation",
  new Schema(
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

export default EmployeesEducation;
