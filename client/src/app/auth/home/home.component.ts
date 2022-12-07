import { Component, OnInit } from '@angular/core';
import { EmployeePersonalDataService } from 'src/app/services/employee-personal-data.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private UserService: UserService,
    private EmployeePersonalDataService: EmployeePersonalDataService
  ) {}

  content?: string;
  showThisContent$: any;

  ngOnInit(): void {
    this.EmployeePersonalDataService.getShowContentOnHomePage().subscribe(
      (data) => {
        this.showThisContent$ = data;
      }
    );

    this.UserService.getPublicContent().subscribe({
      next: (data) => {
        this.content = data;
      },
      error: (err) => {
        console.error(err);
        if (err.error) {
          this.content = JSON.parse(err.error).message;
        } else {
          this.content = 'Error with status: ' + err.status;
        }
      },
    });
  }
}
