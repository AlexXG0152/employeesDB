import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeGrowthPlanService } from '../../services/employee-growth-plan.service';
import { EmployeePersonalDataService } from '../../services/employee-personal-data.service';

@Component({
  selector: 'app-employee-growth-plan',
  templateUrl: './employee-growth-plan.component.html',
  styleUrls: ['./employee-growth-plan.component.scss'],
})
export class EmployeeGrowthPlanComponent implements OnInit {
  constructor(
    private EmployeeGrowthPlanService: EmployeeGrowthPlanService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  employeeID?: string;
  public taskList: any = [];

  employeeGrowthPlanForm = new FormGroup({
    growthPlanTaskTitle: new FormControl('', Validators.required),
    growthPlanTaskDescription: new FormControl('', Validators.required),
    growthPlanTaskAddDate: new FormControl('', Validators.required),
    growthPlanTaskPlannedEndDate: new FormControl('', Validators.required),
  });

  async createTask(): Promise<void> {
    console.warn(this.employeeGrowthPlanForm.value);
    this.EmployeeGrowthPlanService.createEmployeeGrowthPlan(
      this.employeeID!,
      this.employeeGrowthPlanForm.value
    ).subscribe(() => {
      this.getTasks();
    });
  }

  async getTasks(): Promise<void> {
    this.EmployeeGrowthPlanService.getEmployeeGrowthPlan(
      this.employeeID!
    ).subscribe((task) => {
      this.taskList = task;
    });
  }

  async saveTask(): Promise<void> {
    let update = { _id: this.editTaskId, employeeID: this.employeeID };
    update = { ...update, ...this.editEmployeeGrowthPlanForm.value };

    this.EmployeeGrowthPlanService.patchEmployeeGrowthPlan(
      this.employeeID!,
      update
    ).subscribe(() => {
      this.getTasks();
    });
    this.closePopup();
  }

  async deleteTask(_id: string): Promise<void> {
    this.EmployeeGrowthPlanService.deleteEmployeeGrowthPlan(
      this.employeeID!,
      _id
    ).subscribe(() => {
      this.getTasks();
    });
  }

  // POP-UP
  displayStyle = 'none';
  editTaskId?: string;
  editEmployeeGrowthPlanForm = new FormGroup({
    growthPlanTaskTitle: new FormControl('', Validators.required),
    growthPlanTaskDescription: new FormControl('', Validators.required),
    growthPlanTaskAddDate: new FormControl('', Validators.required),
    growthPlanTaskPlannedEndDate: new FormControl('', Validators.required),
  });

  openPopup(taskData: any): void {
    this.editTaskId = taskData._id;
    this.displayStyle = 'block';
    this.editEmployeeGrowthPlanForm
      .get('growthPlanTaskTitle')
      ?.setValue(taskData.growthPlanTaskTitle);
    this.editEmployeeGrowthPlanForm
      .get('growthPlanTaskDescription')
      ?.setValue(taskData.growthPlanTaskDescription);
    this.editEmployeeGrowthPlanForm
      .get('growthPlanTaskAddDate')
      ?.setValue(taskData.growthPlanTaskAddDate);
    this.editEmployeeGrowthPlanForm
      .get('growthPlanTaskPlannedEndDate')
      ?.setValue(taskData.growthPlanTaskPlannedEndDate);
  }
  closePopup(): void {
    this.displayStyle = 'none';
    this.editTaskId = '';
  }

  async ngOnInit(): Promise<void> {
    this.route.params.subscribe(() => {
      this.employeeID = this.router.url.split('/')[2];
    });
    await this.getTasks();
  }
}
