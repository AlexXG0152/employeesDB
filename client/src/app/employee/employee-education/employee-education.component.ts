import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EmployeeEducationService } from 'src/app/services/employee-education.service';
import { StorageService } from '../../services/storage.service';
import { EmployeePersonalDataService } from '../../services/employee-personal-data.service';
import { IEmployee } from 'src/app/interfaces/employee';
import { IEmployeeEducation } from 'src/app/interfaces/employeeEducation';

@Component({
  selector: 'app-employee-education',
  templateUrl: './employee-education.component.html',
  styleUrls: ['./employee-education.component.scss'],
})
export class EmployeeEducationComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private EmployeeEducationService: EmployeeEducationService,
    private StorageService: StorageService,
    private EmployeePersonalDataService: EmployeePersonalDataService
  ) {}

  private roles: string[] = [];
  employeeEducationData?: IEmployeeEducation[];
  employeeID: string = '';
  employeePersonalData?: IEmployee;

  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.employeeID = params['id'];
    });
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
    this.EmployeeEducationService.getEmployeeEducation(
      this.employeeID
    ).subscribe((data) => {
      this.employeeEducationData = data;
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

  makeEditable(data: string) {
    this.employeeEducationData = this.employeeEducationData!.map(
      (row: IEmployeeEducation) => {
        if (row._id === data) {
          row.selected = row.editable = true;
          return row;
        } else {
          row.selected = row.editable = false;
          return row;
        }
      }
    );
  }

  saveData(updatedData: IEmployeeEducation) {
    this.EmployeeEducationService.patchEmployeeEducation(
      this.employeeID,
      updatedData
    ).subscribe(() => {
      this.getData();
    });
  }

  cancel() {
    this.employeeEducationData = this.employeeEducationData!.map(
      (row: IEmployeeEducation) => {
        row.selected = row.editable = false;
        return row;
      }
    );
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
    const details = {
      employeeID: this.employeeID,
      ...this.employeeEducationForm.value,
    };
    this.EmployeeEducationService.createEmployeeEducation(
      this.employeeID,
      details
    ).subscribe(() => {
      this.getData();
    });
    this.displayStyle = 'none';
  }
}
