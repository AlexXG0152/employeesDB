import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { DataService } from 'src/app/services/users.service';
import { Employee } from '../../interfaces/employees';

@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.scss'],
})
export class ResultPageComponent implements OnInit {
  constructor(private DataService: DataService) {}

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

  usersData: any = [];
  usersData$?: Subscription;

  getUserByFirstName() {
    if (this.searchText.length === 0 || this.searchText.match(/^\d/)) {
      this.show = false;
    } else {
      this.DataService.getUserByFirstName(this.searchText).subscribe(
        (data: Employee) => {
          this.usersData = data;

          this.usersData = this.usersData.filter(
            (user: { firstName: string }) =>
              user.firstName.toLowerCase() === this.searchText.toLowerCase()
          );
          this.show = true;
          this.DataService.passResults(this.usersData);
        }
      );
    }
  }

  ngOnInit() {
    this.usersData$ = this.DataService.getPassedResults().subscribe((data) => {
      this.usersData = data;
    });
    this.show = true;
  }
}
