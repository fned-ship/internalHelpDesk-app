import { Component } from '@angular/core';
import { monTicket, Ticket } from "../../components/tickets/tickets";
import { AffichageDetails } from "../../components/affichage-details/affichage-details";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-admin-tickets',
  imports: [Ticket, AffichageDetails],
  templateUrl: './admin-tickets.html',
  styleUrl: './admin-tickets.css'
})
export class AdminTickets {
    tickets:any=[]
    constructor(private http: HttpClient) {}

    ngOnInit() {
      this.http.get(environment.serverURL+'/getalltickets').subscribe((res :any) => {
        this.tickets = res.body;
        console.log(this.tickets)
      });
    }

    deleteTicket(id:string):boolean{
      this.http.delete(environment.serverURL+'/deleteticket/'+id,{ observe: 'response' }).subscribe((res :any) => {
        return res.status==200 
      });
      return false 
    }

    updateTicket(id:string , desc : string){
      console.log(id ,desc)
      this.http.put(
      `${environment.serverURL}/updateticket/${id}`, desc,{ observe: 'response' } ).subscribe(response => {
        console.log("Status:", response.status);   // 200
        console.log("Body:", response.body);       // updated data
        return response.status==200 
      });
      return false 
    }

    //  tickets:monTicket[]=[{name:"Probleme Login",status:"Done",fromWho:"Lina Haddad",toWho:"Omar Ben Ali",expireDate:"2025-11-10",priority:"High",description:"lezmek tkmel el 5edma lyoum "},{name:"Probleme Login 2",status:"Pending",fromWho:"Samir loussif",toWho:"Hamza jlassi",expireDate:"2028-12-10",priority:"Low",description:"fi 3aklek "}];


      editClicked:boolean=false;
      selectedTicket?:monTicket;
      onEdit(ticket:monTicket){
          this.editClicked=true;
          this.selectedTicket=ticket;

     }


     /*modif description */
     editDescription(description:string){
       let index:number=this.tickets.findIndex((item:any)=> item.name==this.selectedTicket?.id );
       console.log(index);
       if(index!=-1 && this.updateTicket(this.selectedTicket!.id , description)){
        this.tickets[index].description=description;
       }


     }



     /*delete */
     ondelete(id:string){
      if(this.deleteTicket(id)){
        this.tickets=this.tickets.filter((item:any)=>item.id!=id);
        console.log(this.tickets);
      }else{

      }
     }




}
