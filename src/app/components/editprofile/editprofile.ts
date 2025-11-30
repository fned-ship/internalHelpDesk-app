import { Component, OnInit, Input,output} from '@angular/core';
import { ReactiveFormsModule ,FormBuilder, FormGroup, Validators } from '@angular/forms'
import { UserService } from '../../services/user.service';

@Component({
  selector: 'editprofile',
  imports: [ReactiveFormsModule],
  templateUrl: './editprofile.html',
  styleUrl: './editprofile.css',
})
export class Editprofile implements OnInit {


  @Input() user:any;

  userevent=output<any>();

  msg=""
  infoForm!: FormGroup;
  pwdForm!: FormGroup;

  imageName = '';
  imageFile: File | undefined = undefined;
  ImageNameColor = 'green';

  constructor( private fb: FormBuilder, private us:UserService) {}
  ngOnInit(): void {
    this.infoForm = this.fb.group({
      firstName: [this.user.firstName, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      birthDay: [this.user.birthDay, Validators.required],
      address: [this.user.address, Validators.required],
      number: [this.user.number, Validators.required],
      job: [this.user.job, Validators.required]
    });
    this.pwdForm = this.fb.group({
      oldpwd: ['', Validators.required],
      newpwd: ['', Validators.required],
      verify: ['', Validators.required]
    });
  }
  async onSubmit(){
    if(this.infoForm.valid){
        let data=this.infoForm.value
        const res= await this.us.updateUserProfile(this.user.id,data,this.imageFile)
        console.log(res.data?.user)
        this.userevent.emit(res.data?.user)
      
      }
    
  }
  async onSubmit2(){
    if(this.pwdForm.valid){
    let data=this.pwdForm.value
    if(data.newpwd != data.verify){
      this.msg="password doesn't match"
    }else{
      let data=this.infoForm.value
        const res= await this.us.updateUserProfile(this.user.id,data,this.imageFile)
        console.log(res)
        this.msg=res.message||"something went wrong"
    }}
  }

  handleFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.imageFile = file;
      this.imageName = file.name;
      this.ImageNameColor = 'green';
    }
  }

}
