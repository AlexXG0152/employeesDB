import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';
import { EmployeePersonalDataService } from '../../services/employee-personal-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private StorageService: StorageService,
    private AuthService: AuthService,
    private EmployeePersonalDataService: EmployeePersonalDataService
  ) {}

  private roles: string[] = [];

  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;
  showButton$?: boolean;

  ngOnInit(): void {
    this.isLoggedIn = this.StorageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.StorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.username = user.username;
    }
    this.EmployeePersonalDataService.getShowContentOnHomePage().subscribe(
      (data: boolean) => {
        this.showButton$ = data;
      }
    );
  }

  logout(): void {
    this.AuthService.logout().subscribe({
      next: (res) => {
        this.StorageService.clean().then(() => {
          window.location.reload();
          window.location.assign('/home');
          this.isLoggedIn = this.StorageService.isLoggedIn();
        });
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
