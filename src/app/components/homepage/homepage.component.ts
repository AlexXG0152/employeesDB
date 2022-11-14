import { Component, OnInit } from '@angular/core';
import { debounceTime } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';
import { Employees } from '../../interfaces/employees';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  constructor(private UserService: UsersService) {}
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
      this.UserService.getUserByName(this.searchText).subscribe(
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
