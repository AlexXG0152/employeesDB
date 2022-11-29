const mongoose = require("mongoose");

const FamilyMembers = mongoose.model(
  "familyMembers",
  new mongoose.Schema(
    {
      employeeID: {
        type: "Number",
        required: true,
      },
      familyMemberType: {
        type: "Number",
        required: true,
      },
      familyMemberName: {
        type: "String",
        required: true,
      },
      familyMemberBirthDate: {
        type: "String",
        required: true,
      },
      familyMemberDateEnd: {
        type: "String",
      },
      familyMemberDateStart: {
        type: "String",
      },
    },
    { timestamps: true }
  )
);

module.exports = FamilyMembers;
