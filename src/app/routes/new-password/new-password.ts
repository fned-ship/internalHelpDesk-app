import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-new-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './new-password.html',
  styleUrls: ['./new-password.css']
})
export class NewPassword implements OnInit {
  newPasswordForm: FormGroup;
  serverURL = environment.serverURL; // Replace with environment variable

  errMsg = 'Update password';
  errMsgColor = 'white';
  display = 'none';

  email: string | null = null;
  securityCode: string | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient, private route: ActivatedRoute) {
    this.newPasswordForm = this.fb.group({
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.email = this.route.snapshot.queryParamMap.get('email');
    this.securityCode = this.route.snapshot.queryParamMap.get('securitycode');
  }

  onSubmit(): void {
    if (this.newPasswordForm.invalid) return;

    const password = this.newPasswordForm.value.password;
    const body = { email: this.email, password, SecurityCode: this.securityCode };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post<{ res: string }>(`${this.serverURL}/newPassword`, body, { headers })
      .subscribe({
        next: (res) => {
          console.log(res);
          if (res.res === 'Password updated successfully') {
            this.errMsg = 'Password updated successfully!';
            this.errMsgColor = 'hsl(var(--success-hsl))';
            this.display = 'block';
          } else {
            this.errMsg = 'Something went wrong!';
            this.errMsgColor = 'hsl(var(--error-hsl))';
            this.display = 'none';
          }
        },
        error: (err) => {
          console.error('ERROR:', err);
          this.errMsg = 'Something went wrong!';
          this.errMsgColor = 'hsl(var(--error-hsl))';
        }
      });
  }
}
