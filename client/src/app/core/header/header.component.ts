import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';
import { EmployeePersonalDataService } from '../../services/employee-personal-data.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    private employeePersonalDataService: EmployeePersonalDataService,
    private router: Router
  ) {}

  private roles: string[] = [];

  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;
  showButton$?: Subscription;
  showButton?: boolean;
  loginStatus$?: Subscription;

  ngOnInit(): void {
    this.loginStatus$ = this.storageService
      .loginStatus()
      .subscribe(() => {
        this.isLoggedIn = this.storageService.isLoggedIn();

        if (this.isLoggedIn) {
          const user = this.storageService.getUser();
          this.roles = user.roles;

          this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
          this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

          this.username = user.username;
        }

        this.showButton$ = this.employeePersonalDataService
          .getShowContentOnHomePage()
          .subscribe((data) => {
            this.showButton = data;
          });
      });
  }

  logout(): void {
    this.storageService.clean();
    this.authService.logout().subscribe({
      next: (res) => {
        this.isLoggedIn = this.storageService.isLoggedIn();
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  ngOnDestroy(): void {
    this.showButton$?.unsubscribe();
    this.loginStatus$?.unsubscribe();
  }
}
