import { Component , OnInit } from '@angular/core';
import { Compemployee } from './compemployee/compemployee';
import { Compnotification } from './compnotification/compnotification';
import { Editprofile } from '../../components/editprofile/editprofile';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../cookies/auth.service';

@Component({
  selector: 'app-admin',
  imports: [CommonModule, Compemployee, Compnotification,Editprofile],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin {
   lastbtn:number=0;
  /*constructor(private authService: AuthService,private us: UserService) { }

  AllEmps :User[]=[];
  
  async ngOnInit() {
    const res = await this.us.getAllEmployees();
    if (res.status==200){
      console.log(res.data)
      this.AllEmps=res.data ;
    }
  }*/


 // ngOnInit(): void {
  //  this.authService.checkAndRedirect("admin");
 // }
}
