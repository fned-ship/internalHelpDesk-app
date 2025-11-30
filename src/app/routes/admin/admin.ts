import { Component , OnInit } from '@angular/core';
import { Compemployee } from './compemployee/compemployee';
import { Compnotification } from './compnotification/compnotification';
import { Editprofile } from '../../components/editprofile/editprofile';
import { DocumentsComponent } from '../../components/docs/docs';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../cookies/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-admin',
  imports: [CommonModule, Compemployee, Compnotification,Editprofile,DocumentsComponent],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin {
   lastbtn:number=0;
   serverUrl=environment.serverURL;
   curr:any

   constructor(private authService: AuthService,private cookieService:CookieService){}
  

 ngOnInit(): void {
   this.authService.checkAndRedirect("admin");
   this.curr=JSON.parse(this.cookieService.get("user"))
 }
 handleuser(updateduser:any){
  this.curr=updateduser
  this.cookieService.set('user', JSON.stringify(this.curr), { expires: 3 });
 }
}
