import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reset-password.html',
  styleUrls: ['./reset-password.css']
})
export class ResetPassword implements OnInit {

  resetForm: FormGroup;
  serverURL = environment.serverURL; // replace with environment variable
  errMsg = 'Write your email address';
  errColor = 'white';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.resetForm.invalid) return;

    const email = this.resetForm.value.email;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post<{ res: string }>(`${this.serverURL}/resetPassword`, { email }, { headers })
      .subscribe({
        next: (res) => {
          console.log(res);
          if (res.res === 'Link delivered') {
            this.errMsg = 'Check your email';
            this.errColor = 'hsl(var(--success-hsl))';
          } else {
            this.errMsg = 'This email is not available';
            this.errColor = 'hsl(var(--error-hsl))';
          }
        },
        error: (err) => {
          console.error('ERROR:', err);
          this.errMsg = 'Something went wrong';
          this.errColor = 'hsl(var(--error-hsl))';
        }
      });
  }
}
