import { model, Schema } from "mongoose";

const GrowthPlan = model(
  "growthPlan",
  new Schema(
    {
      employeeID: {
        type: "Number",
        required: true,
      },
      growthPlanTaskTitle: {
        type: "String",
        required: true,
      },
      growthPlanTaskDescription: {
        type: "String",
        required: true,
      },
      growthPlanTaskAddDate: {
        type: "String",
        required: true,
      },
      growthPlanTaskPlannedEndDate: {
        type: "String",
      },
      growthPlanTaskFactEndDate: {
        type: "String",
      },
    },
    { timestamps: true }
  )
);

export default GrowthPlan;
