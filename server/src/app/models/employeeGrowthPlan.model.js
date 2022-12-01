const mongoose = require("mongoose");

const GrowthPlan = mongoose.model(
  "growthPlan",
  new mongoose.Schema(
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

module.exports = GrowthPlan;
