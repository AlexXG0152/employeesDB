import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';
import { Router } from '@angular/router';
import { AuthInterceptor } from 'src/app/helpers/auth.interceptor';

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
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router
  ) {}

  form: {
    username: string;
    password: string;
  } = { username: '', password: '' };

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().roles;
    }
  }

  onSubmit(): void {
    const { username, password } = this.form;
    this.authService.login(username, password).subscribe({
      next: (data) => {
        this.storageService.saveUser(data);

        this.isLoggedIn = true;
        this.isLoginFailed = false;
        this.roles = data.roles;
        AuthInterceptor.accessToken = data.token;

        this.reloadPage();
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      },
    });
    this.router.navigate(['/home']);
  }
  reloadPage(): void {
    // window.location.assign('/home');
    window.location.reload();
    // this.router.navigate(['/']);
  }
}
