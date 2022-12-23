import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
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
export class ResultPageComponent implements OnInit, AfterViewInit {
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
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  onSearchTextEntered(searchValue: string): void {
    this.searchText = searchValue;
    this.EmployeePersonalDataService.passShowContentOnHomePage(this.show);
    this.getUserByFirstName();
  }

  getUserByFirstName(): void {
    if (this.searchText.length === 0 || this.searchText.match(/^\d/)) {
      this.show = false;
    } else {
      this.EmployeePersonalDataService.getEmployeeByFirstName(
        this.searchText
      ).subscribe((employee: IEmployee[]) => {
        this.dataSource = new MatTableDataSource<IEmployee>(employee);
        this.EmployeePersonalDataService.passResults(employee);
        this.EmployeePersonalDataService.passShowContentOnHomePage(!this.show);
        this.show = true;
        this.dataSource.paginator = this.paginator!;
        // this.EmployeePersonalDataService.passPaginatorResults(this.paginator);
      });
    }
  }

  ngOnInit(): void {
    this.EmployeePersonalDataService.getPassedResults().subscribe(
      (employee) => {
        this.dataSource = new MatTableDataSource<IEmployee>(employee);
      }
    );
    this.show = true;
  }

  ngAfterViewInit(): void {
    // this.EmployeePersonalDataService.getPassedPaginatorResults().subscribe(
    //   () => {
        this.dataSource.paginator = this.paginator!;
    //   }
    // );
  }

  clear(): void {
    window.location.reload();
  }
}
