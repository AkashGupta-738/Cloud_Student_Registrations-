import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { SignoutComponent } from './signout/signout.component';
import { CodeVerificationComponent } from './code-verification/code-verification.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CourseRegistrationComponent } from './course-registration/course-registration.component';
import { ViewRegistrationComponent } from './view-registration/view-registration.component';
import { ViewCoursesComponent } from './view-courses/view-courses.component';
import { RegisterCourseComponent } from './register-course/register-course.component';
import { MatTableModule } from '@angular/material/table'  
import { MatSelectModule } from '@angular/material/select'  
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';




@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    SignoutComponent,
    CodeVerificationComponent,
    CourseRegistrationComponent,
    ViewRegistrationComponent,
    ViewCoursesComponent,
    RegisterCourseComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCardModule,
    MatTableModule,
    MatSelectModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
