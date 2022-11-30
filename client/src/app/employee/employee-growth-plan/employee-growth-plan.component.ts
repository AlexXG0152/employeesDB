import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

export class Task {
  public growthPlanTaskTitle?: string;
  public descgrowthPlanTaskDescriptionription?: string;
  public growthPlanTaskDescription?: string;
  public growthPlanTaskAddDate?: string;
  public growthPlanTaskPlannedEndDate?: string;
}

@Component({
  selector: 'app-employee-growth-plan',
  templateUrl: './employee-growth-plan.component.html',
  styleUrls: ['./employee-growth-plan.component.scss'],
})
export class EmployeeGrowthPlanComponent implements OnInit {
  constructor() {}

  public taskList: any = [];

  employeeGrowthPlanForm = new FormGroup({
    growthPlanTaskTitle: new FormControl('', Validators.required),
    growthPlanTaskDescription: new FormControl('', Validators.required),
    growthPlanTaskAddDate: new FormControl('', Validators.required),
    growthPlanTaskPlannedEndDate: new FormControl('', Validators.required),
  });

  ngOnInit() {}

  addTask() {
    this.taskList.push(this.employeeGrowthPlanForm.value);
    this.employeeGrowthPlanForm.reset()
  }

  removeTask(index: number) {
    if (index > -1) {
      this.taskList.splice(index, 1);
    }
  }
}
