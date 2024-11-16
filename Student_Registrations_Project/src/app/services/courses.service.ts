import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'https://jydyd1t6xl.execute-api.us-east-1.amazonaws.com/First';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    }),
  };

  getAllCourses(data: any): Observable<any> {
    const dataRes={
      "term":data
    }
    var url = baseUrl + "/courselist"
    return this.http.post<any>(url, dataRes, this.httpOptions);
  }

  getStudentCourses(data: any): Observable<any> {

    const dataRes = {
      "email_id": "aakashgupta738@gmail.com"
    }
    var url = baseUrl + "/studentcourselist"
    return this.http.post<any>(url, dataRes, this.httpOptions);
  }

}
