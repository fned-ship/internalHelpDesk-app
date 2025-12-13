import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule ,FormBuilder, FormGroup, Validators} from '@angular/forms'
import { UserService } from '../../../services/user.service';
import { TicketService } from '../../../services/ticket.service';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'compcreateticket',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './compcreateticket.html',
  styleUrl: './compcreateticket.css',
})
export class Compcreateticket implements OnInit {

  ticketForm!: FormGroup;
  AllEmps:any[]=[]
  curr:any;
  constructor( private fb: FormBuilder, private us:UserService,private ts:TicketService,private cookieService:CookieService) {}

  async ngOnInit() {
    this.curr=JSON.parse(this.cookieService.get("user"))
    const res=await this.us.getAllEmployees()
    this.AllEmps=res.data
    this.ticketForm = this.fb.group({
      employee: ["", Validators.required],
      priority: ["", Validators.required],
      description: ["", Validators.required],
      deadline: ["", Validators.required],
      title: ["", Validators.required]
    });
  }

  onSubmit(){
    if(!this.ticketForm.valid){
      alert("incomplete form")
      return;
    }
    let data=this.ticketForm.value
    data.emp=data.employee._id
    data.chef=this.curr._id
    data.emp_id=data.employee.id
    data.chef_id=this.curr.id
    data.status='In Progress'
    delete data.employee
    console.log(data)
    this.ts.createTicket(data).subscribe({
    next: (response) => alert("ticket created successfully"),
    error: (err) => console.error('Error:', err)
});
    

  }
}
