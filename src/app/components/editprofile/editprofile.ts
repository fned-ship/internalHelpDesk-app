import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule ,FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'editprofile',
  imports: [ReactiveFormsModule],
  templateUrl: './editprofile.html',
  styleUrl: './editprofile.css',
})
export class Editprofile implements OnInit {

  infoForm!: FormGroup;
  pwdForm!: FormGroup;

  imageName = '';
  imageFile: File | null = null;
  ImageNameColor = 'green';

  constructor( private fb: FormBuilder) {}
  ngOnInit(): void {
    this.infoForm = this.fb.group({
      firstName: ['Mohamed Adem', Validators.required],
      lastName: ['Selmi', Validators.required],
      birthDay: ['', Validators.required],
      address: ['manar', Validators.required],
      number: ['89585258', Validators.required],
      job: ['Developper', Validators.required]
    });
    this.pwdForm = this.fb.group({
      oldpwd: ['', Validators.required],
      newpwd: ['', Validators.required],
      verify: ['', Validators.required]
    });
  }
  onSubmit(){
    console.log("wtv")
  }
  onSubmit2(){
    console.log("password")
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
