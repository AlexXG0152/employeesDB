import { Component, OnInit } from '@angular/core';
import { debounceTime } from 'rxjs';
import { DataService } from 'src/app/services/users.service';
import { Employees } from '../../interfaces/employees';

@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.scss'],
})
export class ResultPageComponent implements OnInit {
  constructor(private DataService: DataService) {}
  show: boolean = false;
  displayedColumns: string[] = [
    'firstName lastName',
    'company.department',
    'company.title',
  ];

  searchText: string = '';

  onSearchTextEntered(searchValue: string) {
    this.searchText = searchValue;
    this.getUserByName();
  }

  usersData: any = [];

  getUserByName() {
    if (this.searchText.length === 0 || this.searchText.match(/^\d/)) {
      this.usersData = [];
      this.show = false;
    } else {
      this.DataService.getUserByName(this.searchText).subscribe(
        (data: Employees) => {
          this.usersData = data;

          this.usersData.users = this.usersData?.users?.filter(
            (user: { firstName: string }) =>
              user.firstName.toLowerCase() === this.searchText.toLowerCase()
          );
          this.show = true;
        }
      );
    }
  }

  ngOnInit() {}
}
