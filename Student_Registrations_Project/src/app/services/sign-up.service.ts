import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'https://yovp636b7j.execute-api.us-east-1.amazonaws.com/First';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    }),
  };

  signUp(data: any): Observable<any> {
    var url = baseUrl + "/putstundets"
    return this.http.post<any>(url, data, this.httpOptions);
  }


}
