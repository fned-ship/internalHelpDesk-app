import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  loginForm: FormGroup;

  serverURL = environment.serverURL; // Replace with environment variable

  errorMsg = 'Welcome';
  errorClass = 'login-title';
  emailMsg = '';
  passwordMsg = '';
  emailClass = 'input-group';
  passwordClass = 'input-group';
  language = 'en';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      language: ['en']
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.value;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post<any>(`${this.serverURL}/login`, { email, password }, { headers })
      .subscribe({
        next: (res) => {
          const response = res.res;

          if (response === 'invalid email adress') {
            this.emailMsg = 'invalid email adress';
            this.passwordMsg = '';
            this.emailClass = 'input-group error';
            this.passwordClass = 'input-group';
          } else if (response === 'incorrect password') {
            this.emailMsg = 'valid email adress';
            this.passwordMsg = 'incorrect password';
            this.emailClass = 'input-group success';
            this.passwordClass = 'input-group error';
          } else {
            this.emailMsg = '';
            this.passwordMsg = '';
            this.emailClass = 'input-group';
            this.passwordClass = 'input-group';

            const user = res.user;
            if (user.role=="admin") {
              // Store cookies
              this.cookieService.set('user', JSON.stringify(user), { expires: 3 });
              this.router.navigateByUrl('/admin');
            } else {
              this.errorClass = 'login-title err';
              this.errorMsg = 'Please activate your account first. A verification code was sent to your email.';
            }
          }
        },
        error: (err) => {
          console.error('ERROR:', err);
          this.errorClass = 'login-title err';
          this.errorMsg = 'Something went wrong!';
        }
      });
  }
}
