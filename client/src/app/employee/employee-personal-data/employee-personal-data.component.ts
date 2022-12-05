import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IEmpl } from 'src/app/interfaces/empl';
import { EmployeePersonalDataService } from 'src/app/services/employee-personal-data.service';

@Component({
  selector: 'app-employee-personal-data',
  templateUrl: './employee-personal-data.component.html',
  styleUrls: ['./employee-personal-data.component.scss'],
})
export class EmployeePersonalDataComponent implements OnInit {
  employeeData: IEmpl[] = [];
  id?: string;

  constructor(
    private route: ActivatedRoute,
    private EmployeePersonalDataService: EmployeePersonalDataService,
    private router: Router
  ) {
    this.route.params.subscribe(() => {
      this.id = this.router.url.split('/')[2];
      // try {
      //   if (this.id) {
      //     this.EmployeePersonalDataService.getEmployee(this.id).subscribe(
      //       (employee) => {
      //         this.employeeData.push(employee);
      //       }
      //     );
      //   }
      // } catch (error) {
      //   console.error(error);
      // }
    });
  }

  ngOnInit(): void {
    this.EmployeePersonalDataService.getEmployee(this.id!).subscribe(
      (employee) => {
        this.employeeData.push(employee);
      }
    )
  }
}
