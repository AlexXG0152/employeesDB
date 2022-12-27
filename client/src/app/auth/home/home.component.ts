import { Component, OnInit } from '@angular/core';
import { EmployeePersonalDataService } from '../../services/employee-personal-data.service';
import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private userService: UserService,
    private employeePersonalDataService: EmployeePersonalDataService
  ) {}

  longText = `Here can be some interesting functionality for simple homepage witout
  login or registration. All interestion on moderator's board.`;

  content?: string;
  showThisContent?: boolean;
  showThisContent$?: Subscription;

  ngOnInit(): void {
    this.showThisContent$ = this.employeePersonalDataService
      .getShowContentOnHomePage()
      .subscribe((data) => {
        this.showThisContent = data;
      });

    this.userService.getPublicContent().subscribe({
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

  ngOnDestroy(): void {
    this.showThisContent$?.unsubscribe();
  }
}
