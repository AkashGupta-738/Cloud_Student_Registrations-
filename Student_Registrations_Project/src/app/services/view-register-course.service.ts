import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'https://dk3sw5a54e.execute-api.us-east-1.amazonaws.com/First';

@Injectable({
  providedIn: 'root'
})
export class ViewRegisterCourseService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    }),
  };

  getStudentRegisteredCourses(data: any): Observable<any> {
    var url = baseUrl + "/viewstudentregistercourses"
    return this.http.post<any>(url, data, this.httpOptions);
  }

}

