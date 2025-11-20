import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'ticket',
  imports: [CommonModule],
  templateUrl: './ticket.html',
  styleUrl: './ticket.css',
})

export class Ticket {
  ticks=["gddhdjkhildjdhjkdhjhdjujkduddhkhgkdgjddduidhudgkff","hh", "dd",""];
  public real(c:string) {
    if(c==""){
      return "null";
    }
    else{return c}
  }
}
