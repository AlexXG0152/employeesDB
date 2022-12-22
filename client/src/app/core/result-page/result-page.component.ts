import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { EmployeePersonalDataService } from '../../services/employee-personal-data.service';
import { IEmployee } from '../../interfaces/employee';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

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

  @ViewChild(MatPaginator, { static: false }) paginator?: MatPaginator;
  searchText: string = '';

  onSearchTextEntered(searchValue: string) {
    this.searchText = searchValue;
    this.EmployeePersonalDataService.passShowContentOnHomePage(this.show);
    this.getUserByFirstName();
  }

  employeesData$?: Subscription;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  getUserByFirstName() {
    if (this.searchText.length === 0 || this.searchText.match(/^\d/)) {
      this.show = false;
    } else {
      this.EmployeePersonalDataService.getEmployeeByFirstName(
        this.searchText
      ).subscribe((employee: IEmployee[]) => {
        this.dataSource = new MatTableDataSource<IEmployee>(employee);

        // this.employeesData = this.employeesData.filter(
        //   (user: { firstName: string }) =>
        //     user.firstName.toLowerCase() === this.searchText.toLowerCase()
        // );
        this.EmployeePersonalDataService.passResults(employee);
        this.EmployeePersonalDataService.passShowContentOnHomePage(!this.show);
        this.show = true;
        this.dataSource.paginator = this.paginator!;
      });
    }
  }

  ngOnInit() {
    this.employeesData$ =
      this.EmployeePersonalDataService.getPassedResults().subscribe(
        (employee) => {
          this.dataSource = new MatTableDataSource<IEmployee>(employee);
        }
      );
    this.show = true;
    this.dataSource.paginator = this.paginator!;
  }

  clear() {
    window.location.reload();
  }
}
