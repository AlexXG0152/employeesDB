import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IEmpl } from 'src/app/interfaces/empl';
import { EmployeePersonalDataService } from 'src/app/services/employee-personal-data.service';

@Component({
  selector: 'app-employee-personal-data',
  templateUrl: './employee-personal-data.component.html',
  styleUrls: ['./employee-personal-data.component.scss'],
})
export class EmployeePersonalDataComponent implements OnInit {
  employeeData: IEmpl[] = [];
  employeeID?: string;

  constructor(
    private route: ActivatedRoute,
    private EmployeePersonalDataService: EmployeePersonalDataService,
  ) {
    this.route.params.subscribe((params) => {
      this.employeeID = params['id']
    });
  }

  ngOnInit(): void {
    this.EmployeePersonalDataService.getEmployee(this.employeeID!).subscribe(
      (employee) => {
        this.employeeData.push(employee);
      }
    );
  }
}
