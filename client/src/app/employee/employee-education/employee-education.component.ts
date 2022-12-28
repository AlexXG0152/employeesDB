import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from '../../services/storage.service';
import { IEmployeeEducation } from '../../interfaces/employeeEducation';
import { EmployeeDataService } from 'src/app/services/employee-data.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';

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
    public dialog: MatDialog
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

  async updateRecord(): Promise<void> {
    const update = {
      _id: this.editEployeeEducationRecordID,
      employeeID: this.employeeID,
      ...this.employeeEducationForm.value,
    };
    this.employeeDataService.patchEmployeeData(
      this.employeeID!,
      update, 'education'
    ).subscribe(() => {
      this.getData();
    });
    this.closePopup();
  }

  addRecordButton: string = '';
  editEployeeEducationRecordID?: string;

  // POP-UP
  displayStyle = 'none';
  openPopup(employeeEducationData: any): void {
    if (!employeeEducationData._id) {
      this.addRecordButton = 'add';
    }
    this.editEployeeEducationRecordID = employeeEducationData._id;
    this.displayStyle = 'block';
    this.employeeEducationForm
      .get('educationType')
      ?.setValue(employeeEducationData.educationType);
    this.employeeEducationForm
      .get('educationLevel')
      ?.setValue(employeeEducationData.educationLevel);
    this.employeeEducationForm
      .get('educationCenterName')
      ?.setValue(employeeEducationData.educationCenterName);
    this.employeeEducationForm
      .get('educationProfile')
      ?.setValue(employeeEducationData.educationProfile);
    this.employeeEducationForm
      .get('educationDegree')
      ?.setValue(employeeEducationData.educationDegree);
    this.employeeEducationForm
      .get('educationDateEnd')
      ?.setValue(employeeEducationData.educationDateEnd);
    this.employeeEducationForm
      .get('educationDiplomaNumber')
      ?.setValue(employeeEducationData.educationDiplomaNumber);
    this.employeeEducationForm
      .get('educationDiplomaDate')
      ?.setValue(employeeEducationData.educationDiplomaDate);
  }

  closePopup(): void {
    this.displayStyle = 'none';
    this.editEployeeEducationRecordID = '';
    this.addRecordButton = '';
  }

  employeeEducationForm = new FormGroup({
    educationType: new FormControl('', Validators.required),
    educationLevel: new FormControl('', [Validators.required, Validators.pattern('[0-9]+')]),
    educationCenterName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
    educationProfile: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
    educationDegree: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
    educationDateEnd: new FormControl('', Validators.required),
    educationDiplomaNumber: new FormControl('', Validators.required),
    educationDiplomaDate: new FormControl('', Validators.required),
  });



  openDialog(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '550px',
      data: { header: 'Angular', textTitle: 'this.color', text: 'this.color' },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
