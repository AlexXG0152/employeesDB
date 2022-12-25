import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IEmployeeGrowthTask } from '../../interfaces/growthTask';
import { EmployeeDataService } from 'src/app/services/employee-data.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-employee-growth-plan',
  templateUrl: './employee-growth-plan.component.html',
  styleUrls: ['./employee-growth-plan.component.scss'],
})
export class EmployeeGrowthPlanComponent implements OnInit {
  constructor(
    private employeeDataService: EmployeeDataService,
    private route: ActivatedRoute,
    private storageService: StorageService
  ) {}

  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  employeeID?: string;
  taskList: IEmployeeGrowthTask[] = [];

  employeeGrowthPlanForm = new FormGroup({
    growthPlanTaskTitle: new FormControl('', Validators.required),
    growthPlanTaskDescription: new FormControl('', Validators.required),
    growthPlanTaskAddDate: new FormControl('', Validators.required),
    growthPlanTaskPlannedEndDate: new FormControl('', Validators.required),
  });

  async createTask(): Promise<void> {
    const details = {
      ...this.employeeGrowthPlanForm.value,
      employeeID: this.employeeID,
    };
    this.employeeDataService
      .createEmployeeData(this.employeeID!, details, 'growth-plan')
      .subscribe(() => {
        this.getTasks();
        this.employeeGrowthPlanForm.get('growthPlanTaskTitle')?.reset();
        this.employeeGrowthPlanForm.get('growthPlanTaskDescription')?.reset();
      });
  }

  async getTasks(): Promise<void> {
    this.employeeDataService
      .getEmployeeData(this.employeeID!, 'growth-plan')
      .subscribe((task) => {
        this.taskList = task as IEmployeeGrowthTask[];
      });
  }

  async saveTask(): Promise<void> {
    let update = { _id: this.taskId, employeeID: this.employeeID };
    update = { ...update, ...this.editEmployeeGrowthPlanForm.value };

    this.employeeDataService
      .patchEmployeeData(this.employeeID!, update, 'growth-plan')
      .subscribe(() => {
        this.getTasks();
      });
    this.closePopup();
  }

  async finishTask(): Promise<void> {
    let update = {
      _id: this.taskId,
      employeeID: this.employeeID,
      growthPlanTaskFactEndDate: new Date().toISOString().slice(0, 10),
    };
    this.employeeDataService
      .patchEmployeeData(this.employeeID!, update, 'growth-plan')
      .subscribe(() => {
        this.getTasks();
        this.closePopupU('displayFinish');
      });
  }

  async deleteTask(): Promise<void> {
    this.employeeDataService
      .deleteEmployeeData(this.employeeID!, this.taskId!, 'growth-plan')
      .subscribe(() => {
        this.getTasks();
        this.closePopupU('displayDelete');
      });
  }

  // POP-UP
  displayStyle = 'none';
  taskId?: string;
  editEmployeeGrowthPlanForm = new FormGroup({
    growthPlanTaskTitle: new FormControl('', Validators.required),
    growthPlanTaskDescription: new FormControl('', Validators.required),
    growthPlanTaskAddDate: new FormControl('', Validators.required),
    growthPlanTaskPlannedEndDate: new FormControl('', Validators.required),
  });

  openPopup(taskData: IEmployeeGrowthTask): void {
    this.taskId = taskData._id;
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
    this.taskId = '';
  }

  async ngOnInit(): Promise<void> {
    this.route.params.subscribe((params) => {
      this.employeeID = params['id'];
    });
    await this.getTasks();

    this.isLoggedIn = this.storageService.isLoggedIn();
    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.roles;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
      this.username = user.username;
    }
  }

  displayFinish = 'none';
  displayDelete = 'none';

  openPopupU(task: IEmployeeGrowthTask, modal: string): void {
    this.taskId = task._id;
    modal === 'displayFinish'
      ? (this.displayFinish = 'block')
      : (this.displayDelete = 'block');
  }

  closePopupU(modal: string): void {
    modal === 'displayFinish'
      ? (this.displayFinish = 'none')
      : (this.displayDelete = 'none');
    this.taskId = '';
  }
}
