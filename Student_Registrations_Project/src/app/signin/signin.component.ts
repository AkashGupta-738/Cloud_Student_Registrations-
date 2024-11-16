import { Component, OnInit } from '@angular/core';
import { Users } from '../Models/Users';
import { Router } from '@angular/router';
import { ValidationService } from '../services/validation.service';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { LoginService } from '../services/login.service';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

  isConfirm: boolean = false;
  user: Users = {} as Users;
  errorMessage=false;
  signForm!: FormGroup;
  isSubmitted = false;
  constructor(private formBuilder: FormBuilder, private router: Router, private loginSerivce: LoginService, private httpClient: HttpClient) {
  }

  mainForm() {
    this.signForm = this.formBuilder.group({
      Email: ['',Validators.required],
      Password: ['',Validators.required]
    })
  }
  get Email(): FormControl {
    return this.signForm.get("Email") as FormControl;
  }


  get Password(): FormControl {
    return this.signForm.get("Password") as FormControl;
  }

  submitSignIN() {
    this.isSubmitted = true;
    const data={
      "email_id": this.signForm.value.Email,
      "password": this.signForm.value.Password
    }
    this.loginSerivce.Login(data).subscribe({
      next: (data: any) => {
        if(data==true)
        {
          localStorage.setItem('email_id', this.signForm.value.Email);
          this.router.navigate(['/courseRegistration']);
        }
        else
        {
          this.errorMessage = true
        }
      },
      error: (e: any) => console.error(e)
    });
  }

  ngOnInit(): void {
    this.mainForm();
  }



}
