export interface IEmployeeGrowthTask {
  employeeID: number;
  growthPlanTaskTitle: string;
  growthPlanTaskDescription: string;
  growthPlanTaskAddDate: string;
  growthPlanTaskPlannedEndDate: string;
  growthPlanTaskFactEndDate?: string;
  _id: string;
  updatedAt?: string;
  createdAt?: string;
}
