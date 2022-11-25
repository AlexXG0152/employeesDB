const mongoose = require("mongoose");

const FamilyMembers = mongoose.model(
  "familyMembers",
  new mongoose.Schema(
    {
      employeeID: {
        type: "Number",
      },
      familyMemberType: {
        type: "Number",
      },
      familyMemberName: {
        type: "String",
      },
      familyMemberBirthDate: {
        type: "String",
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
