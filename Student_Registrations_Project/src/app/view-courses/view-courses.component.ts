import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CourseRegistrationComponent } from '../course-registration/course-registration.component';
import { CoursesService } from '../services/courses.service';
import { ViewCourseService } from '../services/view-course.service';


interface Courses {
  Professor: String;
  Max_Seat_Allowed: String;
  Course_Name: String;
  Seat_left: String;
  Timing:String;
  Course_Credit:String;
}

@Component({
  selector: 'app-view-courses',
  templateUrl: './view-courses.component.html',
  styleUrls: ['./view-courses.component.css']
})
export class ViewCoursesComponent {
  courseList: Courses[] | undefined;
  terms: string[]=['Fall','Winter','Summer'];
  termSelected:any;

  constructor(private router: Router, private viewCourseService:ViewCourseService) {
  }

  OptionSelect()
  {
    const data={
      "term":this.termSelected
    }

    this.viewCourseService.getAllCourses(data).subscribe({
      next: (data: any) => {
        this.courseList = data
        console.log(this.courseList)
      },
      error: (e: any) => console.error(e)
    });

  }



  }

// [
//   {
//     "Term_ID": "2",
//     "Courses": [
//       {
//         "Professor": "Robert Hawkey",
//         "Course_Name": "Cloud Computing",
//         "Timing": "8:00 am",
//         "Course_Credit": "3"
//       },
//       {
//         "Professor": "Gabriella Mosquera",
//         "Course_Name": "Web Developement",
//         "Timing": "12:00 pm",
//         "Course_Credit": "3"
//       },
//       {
//         "Professor": "Akram",
//         "Course_Name": "Technology Innovation",
//         "Timing": "2:35 pm",
//         "Course_Credit": "3"
//       }
//     ],
//     "Term_Name": "Winter"
//   },
//   {
//     "Term_ID": "1",
//     "Courses": [
//       {
//         "Professor": "Robert Hawkey",
//         "Course_Name": "ASDC",
//         "Timing": "8:00 am",
//         "Course_Credit": "3"
//       },
//       {
//         "Professor": "Saurabh Dey",
//         "Course_Name": "Data Management",
//         "Timing": "10:00 am",
//         "Course_Credit": "3"
//       },
//       {
//         "Professor": "Andrew",
//         "Course_Name": "Communication Skills",
//         "Timing": "6:00 pm",
//         "Course_Credit": "3"
//       }
//     ],
//     "Term_Name": "Fall"
//   },
//   {
//     "Term_ID": "3",
//     "Courses": [
//       {
//         "Professor": "John",
//         "Course_Name": "Networks",
//         "Timing": "8:00 am",
//         "Course_Credit": "3"
//       },
//       {
//         "Professor": "Saurabh Dey",
//         "Course_Name": "Serverless",
//         "Timing": "12:00 pm",
//         "Course_Credit": "3"
//       },
//       {
//         "Professor": "Paul",
//         "Course_Name": "Advanced Topic in Cloud Computing",
//         "Timing": "2:35 pm",
//         "Course_Credit": "3"
//       }
//     ],
//     "Term_Name": "Fall"
//   }
// ]

