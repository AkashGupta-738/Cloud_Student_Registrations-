import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'https://rwwn34u58b.execute-api.us-east-1.amazonaws.com/First';

@Injectable({
  providedIn: 'root'
})
export class RegisterCourseService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    }),
  };

  registerCourse(data: any): Observable<any> {
    var url = baseUrl + "/registercourse"
    return this.http.post<any>(url, data, this.httpOptions);
  }

}

