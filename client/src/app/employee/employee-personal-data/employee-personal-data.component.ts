import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IEmployee } from '../../interfaces/employee';
import { EmployeePersonalDataService } from '../../services/employee-personal-data.service';
import { emptyEmployee } from '../../../assets/emptyEmployee';
import { StorageService } from '../../services/storage.service';
import { ModalComponent } from '../modal/modal.component'; //111

@Component({
  selector: 'app-employee-personal-data',
  templateUrl: './employee-personal-data.component.html',
  styleUrls: ['./employee-personal-data.component.scss'],
})
export class EmployeePersonalDataComponent implements OnInit {
  CREATE_NEW_EMPLOYEE = 'a7dclde$eqa!qs6$9k1qflme8wObv0kbmfu7$xgtu';
  employeeData: IEmployee[] = [];
  employeeID: string = '';
  editable = false;
  dismissal = false;
  createNew = false;

  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private StorageService: StorageService,
    private EmployeePersonalDataService: EmployeePersonalDataService,
    public dialog: MatDialog //111
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.employeeID = params['id'];
    });
    if (this.employeeID === this.CREATE_NEW_EMPLOYEE) {
      this.createEmployeeForm();
    } else {
      this.getData();
    }

    this.isLoggedIn = this.StorageService.isLoggedIn();
    if (this.isLoggedIn) {
      const user = this.StorageService.getUser();
      this.roles = user.roles;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
      this.username = user.username;
    }
  }

  createEmployee(): void {
    const update = {
      ...this.editEployeeForm.value,
    };
    this.EmployeePersonalDataService.getMaxEmployeeID().subscribe((data) => {
      update.employeeID = data[0].employeeID + 1;
      this.EmployeePersonalDataService.createEmployee(update).subscribe(
        (data) => {
          this.router.navigate([`/employee/${data.employeeID}`]);
        }
      );
    });
    this.cancel();
  }

  getData(): void {
    this.EmployeePersonalDataService.getEmployee(this.employeeID).subscribe(
      (data) => {
        this.employeeData = [data];
      }
    );
  }

  updateEployeePersonalData(update: IEmployee): Subscription {
    return this.EmployeePersonalDataService.patchEmployeePersonalData(
      this.employeeID!,
      update
    ).subscribe(() => {
      this.getData();
    });
  }

  createEmployeeForm(): void {
    this.EmployeePersonalDataService.setData(false);
    this.employeeData = [emptyEmployee];
    this.fillFormData([emptyEmployee]);
    this.editEployeeForm.get('dismissalDate')?.disable();
    this.editEployeeForm.get('dismissalReason')?.disable();
    this.editEployeeForm.get('dismissalDocNumer')?.disable();
    this.editEployeeForm.get('dismissalDocDate')?.disable();

    this.editable = true;
    this.createNew = true;
  }

  save(): void {
    const update = {
      employeeID: this.employeeID,
      ...this.editEployeeForm.value,
    };
    this.updateEployeePersonalData(update);
    this.cancel();
  }

  cancel(): void {
    if (this.editable) {
      this.editable = !this.editable;
    }
    if (this.dismissal) {
      this.dismissal = !this.dismissal;
    }
    if (this.createNew) {
      this.createNew = !this.createNew;
      this.router.navigate(['/mod']);
    }
  }

  dismiss(employee: IEmployee): void {
    this.dismissal = !this.dismissal;
    this.fillFormData([employee]);
  }

  edit(employee: IEmployee): void {
    this.editable = !this.editable;
    this.fillFormData([employee]);
  }

  openDialog(): void {
    const confirmationText = this.editable
      ? 'changes in employee personal data?'
      : 'dismiss this employee';
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '550px',
      data: {
        header: 'CONFIRMATION',
        textTitle: 'Confirm your changes, please.',
        text: `Are you sure confirm ${confirmationText}`,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.save();
      }
      this.cancel();
      console.log(`Dialog result: ${result}`);
    });
  }

  fillFormData([employee]: IEmployee[]): void {
    // this.editEployeeForm.get('employeeID')!.setValue(employee.employeeID);
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
    this.editEployeeForm
      .get('employmentDate')
      ?.setValue(employee.employmentDate);
    this.editEployeeForm
      .get('passportDateStart')
      ?.setValue(employee.passportDateStart);
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
    this.editEployeeForm.get('dismissalDate')?.setValue(employee.dismissalDate);
    this.editEployeeForm
      .get('dismissalReason')
      ?.setValue(employee.dismissalReason);
    this.editEployeeForm
      .get('dismissalDocNumer')
      ?.setValue(employee.dismissalDocNumer);
    this.editEployeeForm
      .get('dismissalDocDate')
      ?.setValue(employee.dismissalDocDate);
  }

  editEployeeForm: FormGroup = new FormGroup({
    // employeeID: new FormControl(''),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    fatherName: new FormControl('', Validators.required),
    sex: new FormControl(''),
    birthDate: new FormControl('', Validators.required),
    nationality: new FormControl(''),
    tradeUnionName: new FormControl(''),
    homeAddress: new FormControl(''),
    date0: new FormControl(''),
    date1: new FormControl(''),
    dismissalDate: new FormControl('', Validators.required),
    employmentDate: new FormControl('', Validators.required),
    passportDateStart: new FormControl(''),
    dismissalReason: new FormControl('', Validators.required),
    dismissalDocNumer: new FormControl('', Validators.required),
    dismissalDocDate: new FormControl('', Validators.required),
    education: new FormControl(''),
    passportNumber: new FormControl(''),
    passportMade: new FormControl(''),
    personalNumber: new FormControl('', Validators.required),
    addressindex: new FormControl(''),
    phoneNumber: new FormControl(''),
    smtn0: new FormControl(''),
    smtn1: new FormControl(''),
    smtn2: new FormControl(''),
    smtn3: new FormControl(''),
  });
}
