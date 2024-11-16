import { Component } from '@angular/core';
import { CoursesService } from '../services/courses.service';
import { Router } from '@angular/router';
import { ViewCourseService } from '../services/view-course.service';
import { RegisterCourseService } from '../services/register-course.service';


interface StudentCoursesDetails {
  Fall: [];
  Winter: [];
  Summer: [];
  Student_Email: String;
}

interface Courses {
  Course_Credit: String;
  Course_Name: String;
  Professor: String;
  Timing: String;
  Max_Seat_Allowed: String;
  Seat_left: String;

}

@Component({
  selector: 'app-register-course',
  templateUrl: './register-course.component.html',
  styleUrls: ['./register-course.component.css']
})
export class RegisterCourseComponent {
  courseAdded=false
  courseName: any;

  constructor(private router: Router, private viewCourseService: ViewCourseService, private registerCourse: RegisterCourseService) {
    this.courseAdded = false;
  }
  course: StudentCoursesDetails | undefined;
  courseList: Courses[] | undefined;
  terms: string[] = ['Fall', 'Winter', 'Summer'];
  termSelected: any;
  displayStyle = "none";

  OptionSelect() {
    const data = {
      "term": this.termSelected
    }
    console.log("Term Selected"+JSON.stringify(data));

    this.viewCourseService.getAllCourses(data).subscribe({
      next: (data: any) => {
        this.courseList = data
        console.log(this.courseList)
      },
      error: (e: any) => console.error(e)
    });

  }

  addCourse(dataValue: any) {
    const dataApi = {
      "student_email": localStorage.getItem('email_id'),
      "term_selected": this.termSelected,
      "courses": dataValue
    }

    this.registerCourse.registerCourse(dataApi).subscribe({
      next: (data: any) => {
        this.courseAdded = true;
        this.courseName = dataValue['Course_Name'];
        console.log("Course_Name" + this.courseName)        
      },
      error: (e: any) => console.error(e)
    });    

  }

}
