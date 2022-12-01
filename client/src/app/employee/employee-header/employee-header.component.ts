import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/interfaces/employees';
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

  ngOnInit(): void {
    this.route.params.subscribe(() => {
      this.employeeID = this.router.url.split('/')[2];
    });
    this.EmployeePersonalDataService.getOnePassedResult().subscribe(
      (data) => (this.employeePersonalData = data)
    );
  }
}
