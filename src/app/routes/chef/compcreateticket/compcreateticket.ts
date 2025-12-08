import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule ,FormBuilder, FormGroup, Validators} from '@angular/forms'
import { UserService } from '../../../services/user.service';
import { TicketService } from '../../../services/ticket.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'compcreateticket',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './compcreateticket.html',
  styleUrl: './compcreateticket.css',
})
export class Compcreateticket implements OnInit {

  ticketForm!: FormGroup;
  AllEmps:any[]=[]
  constructor( private fb: FormBuilder, private us:UserService,private ts:TicketService) {}

  async ngOnInit() {
    const res=await this.us.getAllEmployees()
    this.AllEmps=res.data
    this.ticketForm = this.fb.group({
      emp: ["", Validators.required],
      priority: ["", Validators.required],
      description: ["", Validators.required],
      deadline: ["", Validators.required],
      title: ["", Validators.required]
    });
  }

  onSubmit(){
    console.log(this.ticketForm.value)
  }
}
