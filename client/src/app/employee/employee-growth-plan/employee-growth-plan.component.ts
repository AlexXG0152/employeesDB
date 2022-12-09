import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
    private router: Router,
    private StorageService: StorageService,
  ) {}

  private roles: string[] = [];
  public employeeFamilyMembersList: any = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

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

  async finishTask(task: any): Promise<void> {
    let update = {
      _id: task._id,
      employeeID: this.employeeID,
      growthPlanTaskFactEndDate: new Date().toISOString().slice(0, 10),
    };
    this.EmployeeGrowthPlanService.patchEmployeeGrowthPlan(
      this.employeeID!,
      update
    ).subscribe(() => {
      this.getTasks();
      this.closePopupU("displayFinish")
    });
  }

  async deleteTask(_id: string): Promise<void> {
    this.EmployeeGrowthPlanService.deleteEmployeeGrowthPlan(
      this.employeeID!,
      _id
    ).subscribe(() => {
      this.getTasks();
      this.closePopupU("displayDelete")
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

  openPopupU(modal: string): void {
    modal === 'displayFinish'
      ? (this.displayFinish = 'block')
      : (this.displayDelete = 'block');
  }

  closePopupU(modal: string): void {
    modal === 'displayFinish'
      ? (this.displayFinish = 'none')
      : (this.displayDelete = 'none');
  }
}
