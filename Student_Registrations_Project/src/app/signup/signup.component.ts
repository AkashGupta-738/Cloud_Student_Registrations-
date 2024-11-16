import { Component } from '@angular/core';
import { Users } from '../Models/Users';
import { Router } from '@angular/router';
import { ValidationService } from '../services/validation.service';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { SignUpService } from '../services/sign-up.service';


interface CoursesDetails {
  Courses: [];
  Term_Name: String;
}

interface Courses {
  Course_Credit: String;
  Course_Name: String;
  Professor: String;
  Timing: String;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  isConfirm: boolean = false;
  user: Users = {} as Users;
  course: CoursesDetails | undefined;
  courseList: Courses[] | undefined;
  terms: string[] = ['Fall', 'Winter', 'Summer'];
  termSelected: any;
  isSubmitted=false;
  errorMessage: string = '';
  signForm!: FormGroup;
  constructor(private formBuilder: FormBuilder, private router: Router, private validationService: SignUpService, private httpClient: HttpClient) {
  }

  mainForm() {
    this.signForm = this.formBuilder.group({
      First_Name: ['', Validators.required],
      Last_Name: ['', Validators.required],
      Email: ['', Validators.required],
      Password: ['', Validators.required]

    })
  }

  get First_Name(): FormControl {
    return this.signForm.get("First_Name") as FormControl;
  }

  get Last_Name(): FormControl {
    return this.signForm.get("Last_Name") as FormControl;
  }

  get Email(): FormControl {
    return this.signForm.get("Email") as FormControl;
  }


  get Password(): FormControl {
    return this.signForm.get("Password") as FormControl;
  }

  submitSignUp() {
    this.isSubmitted=true;
     console.log(this.signForm.value.Email)
    const data={
      "email_id": this.signForm.value.Email,
      "first_name": this.signForm.value.First_Name,
      "last_name": this.signForm.value.Last_Name,
      "password": this.signForm.value.Password
    }
    this.validationService.signUp(data).subscribe({
      next: (data: any) => {
        this.router.navigate(['/']);
      },
      error: (e: any) => console.error(e)
    });
  }

  

  ngOnInit(): void {
    this.mainForm();
  }

}
