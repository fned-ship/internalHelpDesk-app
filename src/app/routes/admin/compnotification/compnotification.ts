import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { UserService } from '../../../services/user.service';
import { FormsModule } from '@angular/forms';
import { User } from '../../../models/user.model';

@Component({
  selector: 'compnotification',
  imports: [CommonModule,FormsModule],
  templateUrl: './compnotification.html',
  styleUrl: './compnotification.css',
})
export class Compnotification implements OnInit {
  constructor(private us: UserService) { }
  
    notifs :any=[];
    serverUrl=environment.serverURL;
    selected:number =-1;
    sortkey:number=1;


    async ngOnInit() {
      const res = await this.us.getPendingUsers();
      if (res.status==200){
        this.notifs=res.data ;
      }
    }
    

    async accept(i:number){
      const res = await this.us.acceptUser(this.notifs[i].id)
      if (res.status==200){
        console.log("user accepted")
        this.notifs.splice(i,1)
        this.selected=-1
      }else{
        console.log(this.notifs[i].id)
        alert("something went wrong")
      }
    }
    async reject(i:number){
      const res = await this.us.deleteUser(this.notifs[i].id)
      if (res.status==200){
        console.log("user deleted")
        this.notifs.splice(i,1)
        this.selected=-1
      }else{
        console.log(this.notifs[i].id)
        alert("something went wrong")
      }
    }

    sort(){
      if(this.sortkey==1){
        this.notifs.sort((a:any,b:any)=> a.createdAt.localeCompare(b.createdAt))
      }else{
        this.notifs.sort((a:any,b:any)=> b.createdAt.localeCompare(a.createdAt))
      }

      return this.notifs
    }
}
