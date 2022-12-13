import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IEmployee } from 'src/app/interfaces/employee';
import { EmployeePersonalDataService } from 'src/app/services/employee-personal-data.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-employee-personal-data',
  templateUrl: './employee-personal-data.component.html',
  styleUrls: ['./employee-personal-data.component.scss'],
})
export class EmployeePersonalDataComponent implements OnInit {
  employeeData: IEmployee[] = [];
  employeeID: string = '';
  editable = false;
  // isLoaded = true;

  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  constructor(
    private route: ActivatedRoute,
    private StorageService: StorageService,
    private EmployeePersonalDataService: EmployeePersonalDataService
  ) {}

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

  getData(): void {
    this.EmployeePersonalDataService.getEmployee(this.employeeID).subscribe(
      (data) => {
        this.employeeData = [data];
      }
    );
  }

  createOneEmployee() {
    // this.employeeData = emptyEmployee;
  }

  save() {
    this.editable = !this.editable;
    this.updateEployeePersonalData().subscribe(() => {
      this.EmployeePersonalDataService.getEmployee(this.employeeID).subscribe(
        (data) => {
          console.log('befort', this.employeeData);

          this.employeeData = [data];
          // this.employeeData = employee;
          console.log('after', this.employeeData);
        }
      );
    });
  }

  updateEployeePersonalData(): Observable<IEmployee> {
    const update = {
      // _id: this.employeeData?._id,
      employeeID: this.employeeID,
      ...this.editEployeeForm.value,
    };
    console.log('update', update);

    return this.EmployeePersonalDataService.patchEmployeePersonalData(
      this.employeeID!,
      update
    );
  }

  cancel() {
    this.editable = !this.editable;
  }

  edit(employee: any) {
    this.editable = !this.editable;

    this.editEployeeForm.get('employeeID')?.setValue(employee.employeeID);
    this.editEployeeForm.get('firstName')?.setValue(employee.firstName);
    this.editEployeeForm.get('lastName')?.setValue(employee.lastName);
    this.editEployeeForm.get('fatherName')?.setValue(employee.fatherName);
    this.editEployeeForm.get('sex')?.setValue(employee.sex);
    this.editEployeeForm.get('birthDate')?.setValue(employee.birthDate);
    this.editEployeeForm.get('nationality')?.setValue(employee.nationality);
    this.editEployeeForm
      .get('tradeUnionName')
      ?.setValue(employee.tradeUnionName);
    this.editEployeeForm.get('homeAddress')?.setValue(employee.homeAddress);
    this.editEployeeForm.get('date0')?.setValue(employee.date0);
    this.editEployeeForm.get('date1')?.setValue(employee.date1);
    this.editEployeeForm.get('dismissalDate')?.setValue(employee.dismissalDate);
    this.editEployeeForm
      .get('employmentDate')
      ?.setValue(employee.employmentDate);
    this.editEployeeForm
      .get('passportDateStart')
      ?.setValue(employee.passportDateStart);
    this.editEployeeForm
      .get('dismissalReason')
      ?.setValue(employee.dismissalReason);
    this.editEployeeForm
      .get('dismissalDocNumer')
      ?.setValue(employee.dismissalDocNumer);
    this.editEployeeForm
      .get('dismissalDocDate')
      ?.setValue(employee.dismissalDocDate);
    this.editEployeeForm.get('education')?.setValue(employee.education);
    this.editEployeeForm
      .get('passportNumber')
      ?.setValue(employee.passportNumber);
    this.editEployeeForm.get('passportMade')?.setValue(employee.passportMade);
    this.editEployeeForm
      .get('personalNumber')
      ?.setValue(employee.personalNumber);
    this.editEployeeForm.get('addressindex')?.setValue(employee.addressindex);
    this.editEployeeForm.get('phoneNumber')?.setValue(employee.phoneNumber);
    this.editEployeeForm.get('smtn0')?.setValue(employee.smtn0);
    this.editEployeeForm.get('smtn1')?.setValue(employee.smtn1);
    this.editEployeeForm.get('smtn2')?.setValue(employee.smtn2);
    this.editEployeeForm.get('smtn3')?.setValue(employee.smtn3);
  }

  editEployeeForm = new FormGroup({
    employeeID: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    fatherName: new FormControl(''),
    sex: new FormControl(''),
    birthDate: new FormControl(''),
    nationality: new FormControl(''),
    tradeUnionName: new FormControl(''),
    homeAddress: new FormControl(''),
    date0: new FormControl(''),
    date1: new FormControl(''),
    dismissalDate: new FormControl(''),
    employmentDate: new FormControl(''),
    passportDateStart: new FormControl(''),
    dismissalReason: new FormControl(''),
    dismissalDocNumer: new FormControl(''),
    dismissalDocDate: new FormControl(''),
    education: new FormControl(''),
    passportNumber: new FormControl(''),
    passportMade: new FormControl(''),
    personalNumber: new FormControl(''),
    addressindex: new FormControl(''),
    phoneNumber: new FormControl(''),
    smtn0: new FormControl(''),
    smtn1: new FormControl(''),
    smtn2: new FormControl(''),
    smtn3: new FormControl(''),
  });
}
