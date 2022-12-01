import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeePersonalDataService } from '../../services/employee-personal-data.service';

@Component({
  selector: 'app-employee-header',
  templateUrl: './employee-header.component.html',
  styleUrls: ['./employee-header.component.scss'],
})
export class EmployeeHeaderComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private EmployeePersonalDataService: EmployeePersonalDataService
  ) {}

  employeePersonalData?: any;
  employeeID?: string;

  async getEmployee(): Promise<void> {
    this.EmployeePersonalDataService.getEmployee(this.employeeID!).subscribe(
      (employee) => {
        this.employeePersonalData = employee;
      }
    );
  }

  async ngOnInit(): Promise<void> {
    this.route.params.subscribe(() => {
      this.employeeID = this.router.url.split('/')[2];
    });
    await this.getEmployee();
  }
}
