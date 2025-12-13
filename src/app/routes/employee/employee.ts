import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../cookies/auth.service';
import { Compemployee } from '../admin/compemployee/compemployee';
import { Editprofile } from '../../components/editprofile/editprofile';
import { DocumentsComponent } from '../../components/docs/docs';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environment';
import { Chatbot } from '../../components/chatbot/chatbot';
import { Compticket } from '../../components/compticket/compticket';
@Component({
  selector: 'app-employee',
  imports: [CommonModule, Compemployee,Editprofile,DocumentsComponent,Chatbot,Compticket],
  templateUrl: './employee.html',
  styleUrl: './employee.css',
})
export class Employee implements OnInit {
  lastbtn:number=0;
   serverUrl=environment.serverURL;
   curr:any

   constructor(private authService: AuthService,private cookieService:CookieService){}
  

 ngOnInit(): void {
  console.log("hello")
   this.authService.checkAndRedirect("employee");
   this.curr=JSON.parse(this.cookieService.get("user"))
 }
 handleuser(updateduser:any){
  this.curr=updateduser
  this.cookieService.set('user', JSON.stringify(this.curr), { expires: 3 });
 }
}
