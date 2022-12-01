import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { EmployeePersonalDataService } from 'src/app/services/employee-personal-data.service';
import { Employee } from '../../interfaces/employees';

@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.scss'],
})
export class ResultPageComponent implements OnInit {
  constructor(
    private EmployeePersonalDataService: EmployeePersonalDataService
  ) {}

  show: boolean = false;
  displayedColumns: string[] = [
    'ID',
    'firstName lastName',
    'company.department',
    'company.title',
  ];

  searchText: string = '';

  onSearchTextEntered(searchValue: string) {
    this.searchText = searchValue;
    this.getUserByFirstName();
  }

  employeesData: any = [];
  employeesData$?: Subscription;

  getUserByFirstName() {
    if (this.searchText.length === 0 || this.searchText.match(/^\d/)) {
      this.show = false;
    } else {
      this.EmployeePersonalDataService.getEmployeeByFirstName(
        this.searchText
      ).subscribe((employee: Employee) => {
        this.employeesData = employee;

        this.employeesData = this.employeesData.filter(
          (user: { firstName: string }) =>
            user.firstName.toLowerCase() === this.searchText.toLowerCase()
        );
        this.show = true;
        this.EmployeePersonalDataService.passResults(this.employeesData);
      });
    }
  }

  ngOnInit() {
    this.employeesData$ =
      this.EmployeePersonalDataService.getPassedResults().subscribe((employee) => {
        this.employeesData = employee;
      });
    this.show = true;
  }
}
