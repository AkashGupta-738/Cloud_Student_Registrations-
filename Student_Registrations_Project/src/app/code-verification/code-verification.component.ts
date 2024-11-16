import { Component, OnInit } from '@angular/core';
import { Users } from '../Models/Users';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidationService } from '../services/validation.service';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-code-verification',
  templateUrl: './code-verification.component.html',
  styleUrls: ['./code-verification.component.css']
})
export class CodeVerificationComponent implements OnInit{


  codeVerificationForm!: FormGroup;
  user: Users = {} as Users;
  userParams={
    email:String,
    password:String
  }

  constructor(private route: ActivatedRoute,private formBuilder: FormBuilder, private router: Router, private validationService: ValidationService) {
  }

  ngOnInit(): void {
    this.route.queryParamMap
      .subscribe((params: any) => {
        this.user.email = JSON.stringify(params.params.email);
        this.user.password = JSON.stringify(params.params.password);
      }
      );
      console.log("userDetailsFromparams"+JSON.stringify(this.user))
    this.mainForm();
  }

  mainForm() {
    this.codeVerificationForm = this.formBuilder.group({
      Code: ['']
    })
  }
  get Code(): FormControl {
    return this.codeVerificationForm.get("Code") as FormControl;
  }

  submitCodeVerification() {
    console.log(this.codeVerificationForm.value.Code)
    this.user.code = this.codeVerificationForm.value.Code;
    this.validationService.confirmSignup(this.user).then(() => {
      this.router.navigate(['/signIn']);
    }).catch((error) => {
      alert(error);
    })
  }

}
