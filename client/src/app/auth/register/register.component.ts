import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

export interface IRegisterForm {
  username: null | string;
  email: null | string;
  password: null | string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(private AuthService: AuthService) {}

  form: IRegisterForm = {
    username: null,
    email: null,
    password: null,
  };

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  ngOnInit(): void {}

  onSubmit(): void {
    const { username, email, password } = this.form;
    this.AuthService.register(username, email, password).subscribe({
      next: (data) => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      },
    });
  }
}
