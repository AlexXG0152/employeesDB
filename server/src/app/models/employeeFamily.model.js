import { model, Schema } from "mongoose";

const FamilyMembers = model(
  "familyMembers",
  new Schema(
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

export default FamilyMembers;
