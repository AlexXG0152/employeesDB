import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeEducationService } from 'src/app/services/employee-education.service';
import { StorageService } from '../../services/storage.service';

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
    private StorageService: StorageService
  ) {}

  private roles: string[] = [];
  employeeEducationData?: any;
  id?: any;
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

  getData() {
    this.route.params.subscribe(() => {
      this.id = Number(this.router.url.split('/')[2]);
      try {
        if (this.id) {
          this.EmployeeEducationService.getEmployeeEducation(this.id).subscribe(
            (data) => {
              this.employeeEducationData = data;
            }
          );
        }
      } catch (error) {
        console.error(error);
      }
    });
  }

  deleteData(_id: any) {
    this.EmployeeEducationService.deleteEmployeeEducation(this.id, _id).subscribe(
      (data) => {
        this.getData();
      }
    );
  }
}
