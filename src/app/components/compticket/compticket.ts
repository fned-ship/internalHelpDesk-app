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
      rating:number=0;
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
      console.log(temp)
    return(temp)
    }
    async onSubmit(){
      if(this.ticketForm.valid){
        console.log(this.ticketForm.value)
        this.ts.updateTicket(this.selected.id,this.ticketForm.value).subscribe({
        next: (response) => {this.selected=response.data;
          if(this.type!="admin"){
      this.ts.getTicketsByUserId(this.curr).subscribe({
    next: (response) => this.ticks=response.data,
    error: (err) => console.error('Error:', err)});
       }else{
        this.ts.getAllTickets().subscribe({
    next: (response) => this.ticks=response.body,
    error: (err) => console.error('Error:', err)}); 
    }
        },
        error: (err) => console.error('Error----:', err)
    });
    
      }
      if(this.rating != this.selected.rating){
        this.ts.rateTicket(this.selected.id,this.rating).subscribe({
        next: (response) => this.selected.rating=this.rating ,
        error: (err) => console.error('Error----:', err)
    });
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
      deadline: [this.selected.deadline, Validators.required],
    });
    this.editing=true;
      }
    }
    async delete(){
      console.log("deletin")
      this.ts.deleteTicket(this.selected._id)
      }
    openchat(){
      this.chatting=true;
    }

    async markfinished(){
      this.ts.updateTicket(this.selected.id,{status:"Pending"}).subscribe({
        next: (response) => {this.selected=response.data;
      this.ts.getTicketsByUserId(this.curr).subscribe({
    next: (response) => this.ticks=response.data,
    error: (err) => console.error('Error:', err)});},
        error: (err) => console.error('Error----:', err)
    });}
       

    color(i:number){
    let element;
    for(let j=1;j<=i;j++){
      element =document.getElementById("star"+j) as HTMLElement
      element.style.color="gold"
    }
    for(let j=i+1;j<=5;j++){
      element =document.getElementById("star"+j) as HTMLElement
      element.style.color="gray"
    }
    this.rating=i
    console.log("tick got ", i)
  }
  
}
