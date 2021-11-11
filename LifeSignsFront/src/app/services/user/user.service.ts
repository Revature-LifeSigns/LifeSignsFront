import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../util/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private urlBase = "http://localhost:9025/LifeSigns";

  constructor(private http: HttpClient) {}

  public insertUser(user:string): Observable<User[]> {
    const httpHead = {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        'Access-Control-Allow-Origin':'*'
      })
    };
    return this.http.post<User[]>(this.urlBase + "/register", user, httpHead);
  }


}
