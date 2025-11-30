import { Component , OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { UserService } from '../../../services/user.service';
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
  constructor(private us: UserService, private fb:FormBuilder) { }
  
    AllEmps :User[]=[];
    serverUrl=environment.serverURL;
    selected:any;
    searchterm:string="";
    editing:boolean=false
    infoForm!: FormGroup;

    imageName = '';
    imageFile: File | null = null;
    ImageNameColor = 'green';

    
    async ngOnInit() {
      const res = await this.us.getAllEmployees();
      if (res.status==200){
        console.log(res.data)
        this.AllEmps=res.data ;
      }
      
    }

    date(s:string){
      return new Date(s).toDateString()
    }

    onSubmit(){
      if(this.infoForm.valid){
        let data=this.infoForm.value
        this.selected.lastName=data.lastName
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
}
