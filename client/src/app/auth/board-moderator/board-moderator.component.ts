import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { EmployeePersonalDataService } from '../../services/employee-personal-data.service';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-board-moderator',
  templateUrl: './board-moderator.component.html',
  styleUrls: ['./board-moderator.component.scss'],
})
export class BoardModeratorComponent implements OnInit, OnDestroy {
  constructor(
    private userService: UserService,
    private employeePersonalDataService: EmployeePersonalDataService
  ) {}

  content?: string;
  showThisContent?: boolean;
  showThisContent$?: Subscription;

  async ngOnInit(): Promise<void> {
    this.showThisContent$ = this.employeePersonalDataService
      .getShowContentOnHomePage()
      .subscribe((data: boolean) => {
        this.showThisContent = data;
      });

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
    this.employeePersonalDataService.setData(false);
  }

  ngOnDestroy(): void {
    this.showThisContent$?.unsubscribe();
  }
}
