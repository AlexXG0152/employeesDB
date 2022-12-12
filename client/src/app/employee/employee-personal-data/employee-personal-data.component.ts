import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IEmployee } from 'src/app/interfaces/employee';
import { EmployeePersonalDataService } from 'src/app/services/employee-personal-data.service';
import { emptyEmployee } from 'src/assets/emptyEmployee';

@Component({
  selector: 'app-employee-personal-data',
  templateUrl: './employee-personal-data.component.html',
  styleUrls: ['./employee-personal-data.component.scss'],
})
export class EmployeePersonalDataComponent implements OnInit {
  employeeData: IEmployee[] = [];
  employeeID?: string;

  constructor(
    private route: ActivatedRoute,
    private EmployeePersonalDataService: EmployeePersonalDataService
  ) {
    this.route.params.subscribe((params) => {
      this.employeeID = params['id'];
    });
  }

  ngOnInit(): void {
    this.EmployeePersonalDataService.getEmployee(this.employeeID!).subscribe(
      (employee) => {
        this.employeeData.push(employee);
      }
    );
  }

  createOneEmployee() {
    this.employeeData = emptyEmployee;
  }
}
