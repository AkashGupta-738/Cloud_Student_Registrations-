import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'https://8ol1etoky2.execute-api.us-east-1.amazonaws.com/First';

@Injectable({
  providedIn: 'root'
})
export class ViewCourseService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    }),
  };

  getAllCourses(data: any): Observable<any> {
    var url = baseUrl + "/getsources"
    return this.http.post<any>(url, data, this.httpOptions);
  }

}

