import { Component , OnInit } from '@angular/core';
import { Compemployee } from './compemployee/compemployee';
import { Compnotification } from './compnotification/compnotification';
import { AuthService } from '../../cookies/auth.service';
@Component({
  selector: 'app-admin',
  imports: [Compemployee, Compnotification],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin {
  constructor(private authService: AuthService) { }

 // ngOnInit(): void {
  //  this.authService.checkAndRedirect("admin");
 // }

}
