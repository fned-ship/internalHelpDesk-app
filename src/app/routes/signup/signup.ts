import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule ,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.html',
  imports: [CommonModule, ReactiveFormsModule],
  styleUrls: ['./signup.css']
})
export class Signup implements OnInit {
  signupForm!: FormGroup;
  hiddenPassword = true;
  passwordType = 'password';
  slashDisplay = 'block';
  imageName = '';
  imageFile: File | null = null;
  ImageNameColor = 'green';
  country = 'us';
  emailErrMsg = '';
  pswdErrMsg = '';
  headerMsg = 'Welcome';
  serverURL = environment.serverURL;

  constructor(private http: HttpClient, private fb: FormBuilder) {}

  ngOnInit(): void {
    // Initialize form
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDay: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      job: ['', Validators.required],
      address: ['', Validators.required],
      number: ['', Validators.required],
      cin: ['', Validators.required],
      role: ['employee'], // ✅ replaced user:"client" with role:"employee"
      activated: [false]
    });

    this.fetchCountry();
  }

  async fetchCountry() {
    try {
      const ipResp: any = await this.http.get('https://api.ipify.org?format=json').toPromise();
      const geoResp: any = await this.http.get(`http://www.geoplugin.net/json.gp?ip=${ipResp.ip}`).toPromise();
      if (geoResp && geoResp.geoplugin_countryCode) {
        this.country = geoResp.geoplugin_countryCode.toLowerCase();
      }
    } catch (err) {
      console.error('Error fetching country:', err);
    }
  }

  togglePassword() {
    this.hiddenPassword = !this.hiddenPassword;
    this.passwordType = this.hiddenPassword ? 'password' : 'text';
    this.slashDisplay = this.hiddenPassword ? 'block' : 'none';
  }

  handleFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.imageFile = file;
      this.imageName = file.name;
      this.ImageNameColor = 'green';
    }
  }

  async onSubmit() {
    if (!this.signupForm.valid) return;

    if (!this.imageFile) {
      this.imageName = 'Please upload an image';
      this.ImageNameColor = 'red';
      return;
    }

    this.pswdErrMsg = '';
    this.emailErrMsg = '';

    const formData = new FormData();
    formData.append('data', JSON.stringify(this.signupForm.value));
    formData.append('image', this.imageFile);

    try {
      const res: any = await this.http.post(`${this.serverURL}/signup`, formData).toPromise();
      if (res === 'exist') {
        this.emailErrMsg = 'email already used!';
      } else {
        this.signupForm.reset({
          role: 'employee',
          activated: false
        });
        this.imageFile = null;
        this.imageName = '';
        this.ImageNameColor = 'green';
        this.headerMsg = 'check your email';
      }
    } catch (err) {
      console.error('Error uploading data and images:', err);
    }
  }
}
