import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IEmployee } from 'src/app/interfaces/employee';
import { EmployeePersonalDataService } from '../../services/employee-personal-data.service';

@Component({
  selector: 'app-employee-header',
  templateUrl: './employee-header.component.html',
  styleUrls: ['./employee-header.component.scss'],
})
export class EmployeeHeaderComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private EmployeePersonalDataService: EmployeePersonalDataService
  ) {}

  employeePersonalData?: IEmployee;
  employeeID?: string;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.employeeID = params['id'];
    });
    this.EmployeePersonalDataService.getEmployee(this.employeeID!).subscribe(
      (data) => {
        this.employeePersonalData = data;
        this.EmployeePersonalDataService.passOneResult(data);
      }
    );
  }
}
