import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../user';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  // private url = "insert url here";


  // private httpHead = {
  //   headers: new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Access-Control-Allow-Origin': '*'
  //   })
  // };

  // constructor(private httpClient: HttpClient) { }

  // loginUser(user: User):Observable<User> {
  //   return this.httpClient.post<User>(this.url +"/login", user, this.httpHead);
  // }

  // getAllUsers(user: User):Observable<User> {
  //   return this.httpClient.get
  // }

  // registerUser(user: User):Observable<User> {
  //   return this.httpClient.post<User>(this.url, user, this.httpHead);
  // }

  // logoutUser() {

  // }


}
