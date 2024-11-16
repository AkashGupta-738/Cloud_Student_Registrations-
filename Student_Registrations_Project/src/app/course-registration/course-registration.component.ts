import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-registration',
  templateUrl: './course-registration.component.html',
  styleUrls: ['./course-registration.component.css']
})
export class CourseRegistrationComponent {

  constructor(private router: Router) {
    console.log("My Email ID is" + localStorage.getItem('email_id'))
    
  }

  onShow(value:any)
  {
    if (value =='viewRegistration')
      this.router.navigate(['/viewRegistration']);
    else if (value == 'Register')
      this.router.navigate(['/Register']);
    else if (value == 'viewCourses')
      this.router.navigate(['/viewCourses']);
  }


}
