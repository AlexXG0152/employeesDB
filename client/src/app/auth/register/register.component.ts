import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

interface IRegisterForm {
  username: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form: IRegisterForm = {
    username: '',
    email: '',
    password: '',
  };

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  onSubmit(): void {
    const { username, email, password } = this.form;

    this.authService.register(username, email, password).subscribe({
      next: (data: IRegisterForm) => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      error: (err: { error: { message: string } }) => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      },
    });
  }
}
