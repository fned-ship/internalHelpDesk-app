import { Component,OnInit } from '@angular/core';
import { AuthService } from '../../cookies/auth.service';
import { Compemployee } from '../admin/compemployee/compemployee';
import { Editprofile } from '../../components/editprofile/editprofile';
import { DocumentsComponent } from '../../components/docs/docs';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environment';
import { Chatbot } from '../../components/chatbot/chatbot';
import { Compcreateticket } from './compcreateticket/compcreateticket';
import { Compticket } from '../../components/compticket/compticket';

@Component({
  selector: 'app-chef',
  imports: [CommonModule, Compemployee,Editprofile,DocumentsComponent,Chatbot,Compcreateticket,Compticket],
  templateUrl: './chef.html',
  styleUrl: './chef.css',
})
export class Chef implements OnInit {

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
