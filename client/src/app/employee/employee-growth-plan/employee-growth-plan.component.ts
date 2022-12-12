import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IGrowthTask } from 'src/app/interfaces/growthTask';
import { EmployeeGrowthPlanService } from '../../services/employee-growth-plan.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-employee-growth-plan',
  templateUrl: './employee-growth-plan.component.html',
  styleUrls: ['./employee-growth-plan.component.scss'],
})
export class EmployeeGrowthPlanComponent implements OnInit {
  constructor(
    private EmployeeGrowthPlanService: EmployeeGrowthPlanService,
    private route: ActivatedRoute,
    private StorageService: StorageService
  ) {}

  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  employeeID?: string;
  taskList: IGrowthTask[] = [];

  employeeGrowthPlanForm = new FormGroup({
    growthPlanTaskTitle: new FormControl('', Validators.required),
    growthPlanTaskDescription: new FormControl('', Validators.required),
    growthPlanTaskAddDate: new FormControl('', Validators.required),
    growthPlanTaskPlannedEndDate: new FormControl('', Validators.required),
  });

  async createTask(): Promise<void> {
    this.EmployeeGrowthPlanService.createEmployeeGrowthPlan(
      this.employeeID!,
      this.employeeGrowthPlanForm.value
    ).subscribe(() => {
      this.getTasks();
      this.employeeGrowthPlanForm.get('growthPlanTaskTitle')?.reset();
      this.employeeGrowthPlanForm.get('growthPlanTaskDescription')?.reset();
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
    let update = { _id: this.openTaskId, employeeID: this.employeeID };
    update = { ...update, ...this.editEmployeeGrowthPlanForm.value };

    this.EmployeeGrowthPlanService.patchEmployeeGrowthPlan(
      this.employeeID!,
      update
    ).subscribe(() => {
      this.getTasks();
    });
    this.closePopup();
  }

  async finishTask(): Promise<void> {
    let update = {
      _id: this.openTaskId,
      employeeID: this.employeeID,
      growthPlanTaskFactEndDate: new Date().toISOString().slice(0, 10),
    };
    this.EmployeeGrowthPlanService.patchEmployeeGrowthPlan(
      this.employeeID!,
      update
    ).subscribe(() => {
      this.getTasks();
      this.closePopupU('displayFinish');
    });
  }

  async deleteTask(): Promise<void> {
    this.EmployeeGrowthPlanService.deleteEmployeeGrowthPlan(
      this.employeeID!,
      this.openTaskId!
    ).subscribe(() => {
      this.getTasks();
      this.closePopupU('displayDelete');
    });
  }

  // POP-UP
  displayStyle = 'none';
  openTaskId?: string;
  editEmployeeGrowthPlanForm = new FormGroup({
    growthPlanTaskTitle: new FormControl('', Validators.required),
    growthPlanTaskDescription: new FormControl('', Validators.required),
    growthPlanTaskAddDate: new FormControl('', Validators.required),
    growthPlanTaskPlannedEndDate: new FormControl('', Validators.required),
  });

  openPopup(taskData: IGrowthTask): void {
    this.openTaskId = taskData._id;
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
    this.openTaskId = '';
  }

  async ngOnInit(): Promise<void> {
    this.route.params.subscribe((params) => {
      this.employeeID = params['id'];
    });
    await this.getTasks();

    this.isLoggedIn = this.StorageService.isLoggedIn();
    if (this.isLoggedIn) {
      const user = this.StorageService.getUser();
      this.roles = user.roles;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
      this.username = user.username;
    }
  }

  displayFinish = 'none';
  displayDelete = 'none';

  openPopupU(task: IGrowthTask, modal: string): void {
    this.openTaskId = task._id;
    modal === 'displayFinish'
      ? (this.displayFinish = 'block')
      : (this.displayDelete = 'block');
  }

  closePopupU(modal: string): void {
    modal === 'displayFinish'
      ? (this.displayFinish = 'none')
      : (this.displayDelete = 'none');
    this.openTaskId = '';
  }
}
