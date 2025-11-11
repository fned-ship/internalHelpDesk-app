import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-active',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './active.html',
  styleUrls: ['./active.css']
})
export class Active implements OnInit {
  serverURL = environment.serverURL; // You can replace with environment variable
  securitycode: string | null = null;

  errorMsg = '';
  display = 'none';
  color = 'hsl(var(--success-hsl))';

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.securitycode = this.route.snapshot.paramMap.get('securitycode');

    if (this.securitycode) {
      const body = { securitycode: this.securitycode };
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

      this.http.post(`${this.serverURL}/activate`, body, { headers, responseType: 'text' })
        .subscribe({
          next: (res) => {
            console.log('Response:', res);
            if (res === 'verified') {
              this.errorMsg = 'Your account has been successfully verified';
              this.color = 'hsl(var(--success-hsl))';
              this.display = 'block';
            } else {
              this.errorMsg = 'This code is no longer usable';
              this.color = 'hsl(var(--error-hsl))';
              this.display = 'none';
            }
          },
          error: (err) => console.error('ERROR:', err)
        });
    }
  }
}
