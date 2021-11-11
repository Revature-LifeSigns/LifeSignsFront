import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../util/user';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = "http://localhost:9025";


  private httpHead = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };

  constructor(private httpClient: HttpClient) { }

  loginUser(user: User):Observable<User> {
    return this.httpClient.post<User>(this.url +"/login", user, this.httpHead);
  }



  registerUser(user: User):Observable<User> {
    return this.httpClient.post<User>(this.url, user, this.httpHead);
  }

  logoutUser() {

  }


}
