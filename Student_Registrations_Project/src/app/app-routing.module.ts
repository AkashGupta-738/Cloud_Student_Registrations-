import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { CodeVerificationComponent } from './code-verification/code-verification.component';
import { CourseRegistrationComponent } from './course-registration/course-registration.component';
import { ViewRegistrationComponent } from './view-registration/view-registration.component';
import { ViewCoursesComponent } from './view-courses/view-courses.component';
import { RegisterCourseComponent } from './register-course/register-course.component';

const routes: Routes = [
  { path: 'signUp', component: SignupComponent },
  { path: '', component: SigninComponent },
  { path: 'codeVerification', component: CodeVerificationComponent },
  { path: 'courseRegistration', component: CourseRegistrationComponent },
  { path: 'viewRegistration', component: ViewRegistrationComponent },
  { path: 'Register', component: RegisterCourseComponent },
  { path: 'viewCourses', component: ViewCoursesComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
