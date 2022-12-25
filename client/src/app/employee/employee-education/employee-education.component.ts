import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from '../../services/storage.service';
import { IEmployeeEducation } from '../../interfaces/employeeEducation';
import { EmployeeDataService } from 'src/app/services/employee-data.service';

@Component({
  selector: 'app-employee-education',
  templateUrl: './employee-education.component.html',
  styleUrls: ['./employee-education.component.scss'],
})
export class EmployeeEducationComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private storageService: StorageService,
    private employeeDataService: EmployeeDataService,
  ) {}

  private roles: string[] = [];
  employeeEducationData: IEmployeeEducation[] = [];
  employeeID: string = '';

  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.employeeID = params['id'];
    });
    this.getData();

    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.username = user.username;
    }
  }

  getData(): void {
    this.employeeDataService.getEmployeeData(
      this.employeeID, 'education'
    ).subscribe((data) => {
      this.employeeEducationData = data as IEmployeeEducation[];
    });
  }

  deleteData(_id: string): void {
    this.employeeDataService.deleteEmployeeData(
      this.employeeID,
      _id, 'education'
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
    this.employeeDataService.patchEmployeeData(
      this.employeeID,
      updatedData, 'education'
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
    educationLevel: new FormControl('', [Validators.required, Validators.pattern('[0-9]+')]),
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
    this.employeeDataService.createEmployeeData(
      this.employeeID,
      details,
      'education'
    ).subscribe(() => {
      this.getData();
    });
    this.displayStyle = 'none';
  }
}
