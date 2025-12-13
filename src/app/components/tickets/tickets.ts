import { Component, input, output } from '@angular/core';

export interface monTicket{
  id:string,
  name:string,
  status:string,
  fromWho:string,
  toWho:string,
  expireDate:string,
  priority:string,
  description:string

}

@Component({
  selector: 'app-ticket',
  imports: [],
  templateUrl: './tickets.html',
  styleUrl: './tickets.css'
})
export class Ticket {
  ticket=input<monTicket>();
  

  emitteur=output();
  emitteurDelete=output<string>();

  edit(){
    this.emitteur.emit();
   

  }
  


  /*delete */
  delete(){
        const name=(this.ticket()?.name || "");
        this.emitteurDelete.emit(name);

  }
  
   
  

}
