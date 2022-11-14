import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

export interface ILoginForm {
  username: null;
  password: null;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private AuthService: AuthService,
    private StorageService: StorageService
  ) {}

  form: ILoginForm = {
    username: null,
    password: null,
  };

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  ngOnInit(): void {
    if (this.StorageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.StorageService.getUser().roles;
    }
  }

  onSubmit(): void {
    const { username, password } = this.form;
    this.AuthService.login(username, password).subscribe({
      next: (data) => {
        this.StorageService.saveUser(data);

        this.isLoggedIn = true;
        this.isLoginFailed = false;
        this.roles = this.StorageService.getUser().roles;
        this.reloadPage();
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      },
    });
  }
  reloadPage(): void {
    window.location.reload();
  }
}