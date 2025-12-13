import { Component , Input, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { TicketService } from '../../services/ticket.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule ,FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ChatBox } from '../chat-box/chat-box';

@Component({
  selector: 'compticket',
  imports: [CommonModule, FormsModule, ReactiveFormsModule,ChatBox],
  templateUrl: './compticket.html',
  styleUrl: './compticket.css',
})
export class Compticket implements OnInit {
      @Input() type:string='';
      @Input() curr:string='';
      ticks :any=[];
      serverUrl=environment.serverURL;
      selected:any;
      searchterm:string="";
      status:string="";
      priority:string="";
      editing:boolean=false;
      chatting:boolean=false;
      ticketForm!: FormGroup;
  constructor( private fb:FormBuilder, private ts:TicketService) { }

  async ngOnInit() {
      if(this.type!="admin"){
      this.ts.getTicketsByUserId(this.curr).subscribe({
    next: (response) => this.ticks=response.data,
    error: (err) => console.error('Error:', err)});
       }
      else{
        this.ts.getAllTickets().subscribe({
    next: (response) => this.ticks=response.body,
    error: (err) => console.error('Error:', err)});
      
    }}

    date(s:string){
      return new Date(s).toDateString();
    }

    filter(){
      let temp=[...this.ticks]
      const term = this.searchterm.toLowerCase();
      temp = temp.filter(tick =>
        tick.title.toLowerCase().includes(term) && tick.status.includes(this.status) && tick.priority.includes(this.priority)
      );
    return(temp)
    }
    async onSubmit(){
      if(this.ticketForm.valid){
        let data=this.ticketForm.value
      }
    }
    select(emp:any){
      this.selected=emp;
      this.editing=false;
      this.chatting=false;
    }

    edit(){
      if(this.selected){
        this.ticketForm = this.fb.group({
      title: [this.selected.title, Validators.required],
      description: [this.selected.description, Validators.required],
      status: [this.selected.status, Validators.required],
      priority: [this.selected.priority, Validators.required],
      deadline: [this.selected.priority, Validators.required],
    });
    this.editing=true;
      }
    }
    async delete(){
      console.log("deletin")
      }
    openchat(){
      this.chatting=true;
    }

    async markfinished(){
      console.log("marked as finished!")
    }
  
}
