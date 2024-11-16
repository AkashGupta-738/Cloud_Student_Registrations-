import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'https://2gd9fzgt4i.execute-api.us-east-1.amazonaws.com/First';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    }),
  };

  Login(data: any): Observable<any> {
    var url = baseUrl + "/validation"
    return this.http.post<any>(url, data, this.httpOptions);
  }


}
