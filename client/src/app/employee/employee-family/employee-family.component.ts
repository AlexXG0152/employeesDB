import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeFamilyService } from '../../services/employee-family.service';
import { EmployeePersonalDataService } from '../../services/employee-personal-data.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-employee-family',
  templateUrl: './employee-family.component.html',
  styleUrls: ['./employee-family.component.scss'],
})
export class EmployeeFamilyComponent {
  constructor(
    private EmployeeFamilyService: EmployeeFamilyService,
    private EmployeePersonalDataService: EmployeePersonalDataService,
    private StorageService: StorageService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  employeeID?: string;
  employeePersonalData?: any;

  private roles: string[] = [];
  public employeeFamilyMembersList: any = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  async getEmployee(): Promise<void> {
    this.EmployeePersonalDataService.getEmployee(this.employeeID!).subscribe(
      (employee) => {
        this.employeePersonalData = employee;
      }
    );
  }

  async createEployeeFamilyMember(): Promise<void> {
    this.EmployeeFamilyService.createEmployeeFamilyMember(
      this.employeeID!,
      this.editEployeeFamilyMemberForm.value
    ).subscribe(() => {
      this.getEployeeFamilyMember();
    });
  }

  async getEployeeFamilyMember(): Promise<void> {
    this.EmployeeFamilyService.getEmployeeFamilyMember(
      this.employeeID!
    ).subscribe((familyMember) => {
      this.employeeFamilyMembersList = familyMember;
    });
  }

  async updateEployeeFamilyMember(): Promise<void> {
    let update = {
      _id: this.editEployeeFamilyMemberID,
      employeeID: this.employeeID,
    };
    update = { ...update, ...this.editEployeeFamilyMemberForm.value };

    this.EmployeeFamilyService.patchEmployeeFamilyMember(
      this.employeeID!,
      update
    ).subscribe(() => {
      this.getEployeeFamilyMember();
    });
    this.closePopup();
  }

  async deleteEployeeFamilyMember(_id: string): Promise<void> {
    this.EmployeeFamilyService.deleteEmployeeFamilyMember(
      this.employeeID!,
      _id
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
    if(!familyMemberData._id) {
      this.addRecordButton = 'add'
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
      // this.addRecordButton = ''
  }
  closePopup(): void {
    this.displayStyle = 'none';
    this.editEployeeFamilyMemberID = '';
    this.addRecordButton = ''
  }

  async ngOnInit(): Promise<void> {
    this.route.params.subscribe(() => {
      this.employeeID = this.router.url.split('/')[2];
    });

    this.isLoggedIn = this.StorageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.StorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.username = user.username;
    }
    await this.getEmployee();
    await this.getEployeeFamilyMember();
  }
}
