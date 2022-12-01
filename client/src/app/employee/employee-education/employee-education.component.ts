import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeEducationService } from 'src/app/services/employee-education.service';
import { StorageService } from '../../services/storage.service';
import { EmployeePersonalDataService } from '../../services/employee-personal-data.service';

@Component({
  selector: 'app-employee-education',
  templateUrl: './employee-education.component.html',
  styleUrls: ['./employee-education.component.scss'],
})
export class EmployeeEducationComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private EmployeeEducationService: EmployeeEducationService,
    private StorageService: StorageService,
    private EmployeePersonalDataService: EmployeePersonalDataService
  ) {}

  private roles: string[] = [];
  employeeEducationData?: any;
  employeeID: string = '';
  employeePersonalData?: any;

  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  ngOnInit(): void {
    this.getData();

    this.isLoggedIn = this.StorageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.StorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.username = user.username;
    }
  }

  getEmployee(): void {
    this.EmployeePersonalDataService.getEmployee(this.employeeID).subscribe(
      (employee) => {
        this.employeePersonalData = employee;
      }
    );
  }

  getData(): void {
    this.route.params.subscribe(() => {
      this.employeeID = this.router.url.split('/')[2];
      try {
        if (this.employeeID) {
          this.EmployeeEducationService.getEmployeeEducation(
            this.employeeID
          ).subscribe((data) => {
            this.employeeEducationData = data;
          });
          this.getEmployee();
        }
      } catch (error) {
        console.error(error);
      }
    });
  }

  deleteData(_id: string): void {
    this.EmployeeEducationService.deleteEmployeeEducation(
      this.employeeID,
      _id
    ).subscribe(() => {
      this.getData();
    });
  }

  makeEditable(data: any) {
    this.employeeEducationData = this.employeeEducationData.map((row: any) => {
      if (row._id === data) {
        row.selected = row.editable = true;
        return row;
      } else {
        row.selected = row.editable = false;
        return row;
      }
    });
  }

  saveData(updatedData: any) {
    this.EmployeeEducationService.patchEmployeeEducation(
      this.employeeID,
      updatedData
    ).subscribe(() => {
      this.getData();
    });
  }

  cancel() {
    this.employeeEducationData = this.employeeEducationData.map((row: any) => {
      row.selected = row.editable = false;
      return row;
    });
  }

  // POP-UP
  displayStyle = 'none';
  openPopup(): void {
    this.displayStyle = 'block';
  }
  closePopup(): void {
    this.displayStyle = 'none';
  }
  employeeEducationForm = new FormGroup({
    educationType: new FormControl('', Validators.required),
    educationLevel: new FormControl('', Validators.required),
    educationCenterName: new FormControl('', Validators.required),
    educationProfile: new FormControl('', Validators.required),
    educationDegree: new FormControl('', Validators.required),
    educationDateEnd: new FormControl('', Validators.required),
    educationDiplomaNumber: new FormControl('', Validators.required),
    educationDiplomaDate: new FormControl('', Validators.required),
  });
  createRecord(): void {
    console.warn(this.employeeEducationForm.value);
    this.EmployeeEducationService.createEmployeeEducation(
      this.employeeID,
      this.employeeEducationForm.value
    ).subscribe(() => {
      this.getData();
    });
    this.displayStyle = 'none';
  }
}
