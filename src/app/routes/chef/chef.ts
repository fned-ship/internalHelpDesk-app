import { Component } from '@angular/core';
import { AuthService } from '../../cookies/auth.service';
import { Compemployee } from '../admin/compemployee/compemployee';
import { Editprofile } from '../../components/editprofile/editprofile';
import { DocumentsComponent } from '../../components/docs/docs';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-chef',
  imports: [CommonModule, Compemployee,Editprofile,DocumentsComponent],
  templateUrl: './chef.html',
  styleUrl: './chef.css',
})
export class Chef {

  constructor(private authService: AuthService,private cookieService:CookieService){}
    lastbtn:number=0;
    curr:any;
    serverUrl=environment.serverURL;
  
   ngOnInit(): void {
     this.authService.checkAndRedirect("manager");
     this.curr=JSON.parse(this.cookieService.get("user"))
   }
   handleuser(updateduser:any){
  this.curr=updateduser
  this.cookieService.set('user', JSON.stringify(this.curr), { expires: 3 });
 }
}
