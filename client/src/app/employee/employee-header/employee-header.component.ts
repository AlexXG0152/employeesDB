import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeePersonalDataService } from '../../services/employee-personal-data.service';

@Component({
  selector: 'app-employee-header',
  templateUrl: './employee-header.component.html',
  styleUrls: ['./employee-header.component.scss'],
})
export class EmployeeHeaderComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private employeePersonalDataService: EmployeePersonalDataService
  ) {}

  employeePersonalData: any;
  employeeID: string = '';

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.employeeID = params['id'];
    });

    this.employeePersonalDataService.getOnePassedResult().subscribe((data) => {
      if (data.employeeID === undefined) {
        this.employeePersonalDataService
          .getEmployee(this.employeeID)
          .subscribe((data) => {
            this.employeePersonalData = data;
            this.employeePersonalDataService.passOneResult(data);
          });
      } else {
        this.employeePersonalData = data;
      }
    });
  }
}
