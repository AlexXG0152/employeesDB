import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { EmployeePersonalDataService } from '../../services/employee-personal-data.service';

@Component({
  selector: 'app-board-moderator',
  templateUrl: './board-moderator.component.html',
  styleUrls: ['./board-moderator.component.scss'],
})
export class BoardModeratorComponent implements OnInit {
  constructor(
    private userService: UserService,
    private employeePersonalDataService: EmployeePersonalDataService
  ) {}

  content?: string;
  showThisContent$?: boolean;

  async ngOnInit(): Promise<void> {
    this.employeePersonalDataService.getShowContentOnHomePage().subscribe(
      (data: boolean) => {
        this.showThisContent$ = data;
      }
    );

    this.userService.getModeratorBoard().subscribe({
      next: async (data) => {
        this.content = data;
      },
      error: (err) => {
        if (err.error) {
          try {
            const res = JSON.parse(err.error);
            this.content = res.message;
          } catch {
            this.content = `Error with status: ${err.status} - ${err.statusText}`;
          }
        } else {
          this.content = `Error with status: ${err.status}`;
        }
      },
    });
  }

  createNew() {
    this.employeePersonalDataService.setData(false)
  }
}
