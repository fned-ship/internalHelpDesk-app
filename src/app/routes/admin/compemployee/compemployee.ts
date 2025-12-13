import { Component , Input, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { UserService } from '../../../services/user.service';
import { TicketService } from '../../../services/ticket.service';
import { User } from '../../../models/user.model';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule ,FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'compemployee',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './compemployee.html',
  styleUrl: './compemployee.css',
})
export class Compemployee implements OnInit {
  constructor(private us: UserService, private fb:FormBuilder, private ts:TicketService) { }


    @Input() type:string='';
    @Input() role:string='';
    AllEmps :User[]=[];
    serverUrl=environment.serverURL;
    selected:any;
    searchterm:string="";
    editing:boolean=false;
    recentactivity:any=null;
    infoForm!: FormGroup;

    imageName = '';
    imageFile: File | undefined = undefined;
    ImageNameColor = 'green';

    
    async ngOnInit() {
      if(this.type=="employee"){
      const res2=await this.us.getAllEmployees()
       this.AllEmps=res2.data}
      else{
        {
      const res2=await this.us.getAllManagers()
    this.AllEmps=res2.data}
      }
      
    }

    date(s:string){
      return new Date(s).toDateString()
    }

    async onSubmit(){
      if(this.infoForm.valid){
        let data=this.infoForm.value
        const res= await this.us.updateUserProfile(this.selected.id,data,this.imageFile)
        this.selected=res.data?.user
        console.log("it worked")
        if(this.type=="employee"){
      const res2=await this.us.getAllEmployees()
       this.AllEmps=res2.data}
      else{
        {
      const res2=await this.us.getAllManagers()
    this.AllEmps=res2.data}
      }
      
      }
  }

  handleFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.imageFile = file;
      this.imageName = file.name;
      this.ImageNameColor = 'green';
    }
  }

    filter(){
      let temp=[...this.AllEmps]
      if (this.searchterm) {
      const term = this.searchterm.toLowerCase();
      temp = temp.filter(user =>
        user.lastName.toLowerCase().includes(term) ||
        user.firstName.toLowerCase().includes(term)
      );
    }
    return(temp)
    }

    select(emp:any){
      this.selected=emp;
      this.editing=false;
      const res= this.ts.getLastTicket(this.selected.id).subscribe({
    next: (response) => console.log(response.data),
    error: (err) => console.error('Error:', err)});
      
    }

    edit(){
      if(this.selected){
        this.infoForm = this.fb.group({
      firstName: [this.selected.firstName, Validators.required],
      lastName: [this.selected.lastName, Validators.required],
      birthDay: [this.selected.birthDay, Validators.required],
      address: [this.selected.address, Validators.required],
      number: [this.selected.number, Validators.required],
      job: [this.selected.job, Validators.required]
    });
    this.editing=true;
      }
    }

    async upgrade(){
      const res=await this.us.upgradeToManager(this.selected.id)
      const res2=await this.us.getAllEmployees()
      this.AllEmps=res2.data
      delete this.selected

    }

    async delete(){
      const res=await this.us.deleteUser(this.selected.id)
      if(this.type=="employee"){
      const res2=await this.us.getAllEmployees()
    this.AllEmps=res2.data}
      else{
        {
      const res2=await this.us.getAllManagers()
    this.AllEmps=res2.data}
      }
      
    }
}
