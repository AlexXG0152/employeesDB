import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private StorageService: StorageService,
    private AuthService: AuthService
  ) {}

  title = 'employees';

  private roles: string[] = [];

  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  ngOnInit(): void {
    this.isLoggedIn = this.StorageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.StorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.username = user.username;
    }
  }

  logout(): void {
    this.AuthService.logout().subscribe({
      next: res => {
        console.log(res);
        this.StorageService.clean();

        window.location.reload();
        window.location.assign('/home')
      },
      error: err => {
        console.error(err);
      }
    })
  }

}
