// auth.service.ts
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly USER_COOKIE_KEY = 'user';

  constructor(private cookieService: CookieService, private router: Router) {}

  isAuthenticated(): boolean {
    return this.cookieService.check(this.USER_COOKIE_KEY);
  }

  isRole(role:string):boolean{
    let user=JSON.parse(this.cookieService.get("user"))
    return user.role == role && user.isAccepted && user.isActive;
  }
  checkAndRedirect(role:string) {
    if (!this.isAuthenticated() || !this.isRole(role) ) {
      console.log('User cookie not found, redirecting to login...');
      this.router.navigate(['/login']);
    }

  }
}