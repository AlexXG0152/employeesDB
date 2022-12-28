import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog'; //111
import { ActivatedRoute } from '@angular/router';
import { IEmployeeFamilyMember } from '../../interfaces/employeeFamilyMember';
import { StorageService } from '../../services/storage.service';
import { ModalComponent } from '../modal/modal.component'; //111
import { EmployeeDataService } from 'src/app/services/employee-data.service';

@Component({
  selector: 'app-employee-family',
  templateUrl: './employee-family.component.html',
  styleUrls: ['./employee-family.component.scss'],
})
export class EmployeeFamilyComponent {
  constructor(
    private employeeDataService: EmployeeDataService,
    private storageService: StorageService,
    private route: ActivatedRoute,
    public dialog: MatDialog //111
  ) {}

  employeeID?: string;

  private roles: string[] = [];
  public employeeFamilyMembersList: IEmployeeFamilyMember[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  async ngOnInit(): Promise<void> {
    this.route.params.subscribe((params) => {
      this.employeeID = params['id'];
    });

    this.isLoggedIn = this.storageService.isLoggedIn();
    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.roles;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
      this.username = user.username;
    }

    await this.getEployeeFamilyMember();
  }

  async createEployeeFamilyMember(): Promise<void> {
    const details = {
      employeeID: this.employeeID!,
      ...this.editEployeeFamilyMemberForm.value,
    };
    this.employeeDataService.createEmployeeData(
      this.employeeID!,
      details, 'family'
    ).subscribe(() => {
      this.getEployeeFamilyMember();
    });
  }

  async getEployeeFamilyMember(): Promise<void> {
    this.employeeDataService.getEmployeeData(
      this.employeeID!, 'family'
    ).subscribe((familyMember) => {
      this.employeeFamilyMembersList = familyMember as IEmployeeFamilyMember[];
    });
  }

  async updateEployeeFamilyMember(): Promise<void> {
    const update = {
      _id: this.editEployeeFamilyMemberID,
      employeeID: this.employeeID,
      ...this.editEployeeFamilyMemberForm.value,
    };

    this.employeeDataService.patchEmployeeData(
      this.employeeID!,
      update, 'family'
    ).subscribe(() => {
      this.getEployeeFamilyMember();
    });
    this.closePopup();
  }

  async deleteEployeeFamilyMember(_id: string): Promise<void> {
    this.employeeDataService.deleteEmployeeData(
      this.employeeID!,
      _id, 'family'
    ).subscribe(() => {
      this.getEployeeFamilyMember();
    });
  }

  // POP-UP
  displayStyle = 'none';
  addRecordButton: string = '';
  editEployeeFamilyMemberID?: string;
  editEployeeFamilyMemberForm = new FormGroup({
    familyMemberType: new FormControl('', Validators.required),
    familyMemberName: new FormControl('', Validators.required),
    familyMemberBirthDate: new FormControl('', Validators.required),
    familyMemberDateEnd: new FormControl(''),
    familyMemberDateStart: new FormControl(''),
  });

  openPopup(familyMemberData: any): void {
    if (!familyMemberData._id) {
      this.addRecordButton = 'add';
    }
    this.editEployeeFamilyMemberID = familyMemberData._id;
    this.displayStyle = 'block';
    this.editEployeeFamilyMemberForm
      .get('familyMemberType')
      ?.setValue(familyMemberData.familyMemberType);
    this.editEployeeFamilyMemberForm
      .get('familyMemberName')
      ?.setValue(familyMemberData.familyMemberName);
    this.editEployeeFamilyMemberForm
      .get('familyMemberBirthDate')
      ?.setValue(familyMemberData.familyMemberBirthDate);
    this.editEployeeFamilyMemberForm
      .get('familyMemberDateEnd')
      ?.setValue(familyMemberData.familyMemberDateEnd);
    this.editEployeeFamilyMemberForm
      .get('familyMemberDateStart')
      ?.setValue(familyMemberData.familyMemberDateStart);
  }
  closePopup(): void {
    this.displayStyle = 'none';
    this.editEployeeFamilyMemberID = '';
    this.addRecordButton = '';
  }

  //111
  openDialog() {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '550px',
      data: { header: 'Angular', textTitle: 'this.color', text: 'this.color' },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
