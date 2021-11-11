import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../util/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = "http://localhost:9025/LifeSigns";


  private httpHead = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };

  private loggedInUser: User;
  private userLoggedInStatus: boolean;

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

  loginUser(user: User):Observable<User> {
    return this.http.post<User>(this.url + "/login", user, this.httpHead);
  }

  userLoginStatus(user: User) {
    this.loggedInUser = user;
    this.userLoggedInStatus = true;
  }

  getLoggedInUser():User {
    return this.loggedInUser;
  }

  isUserLoggedIn():boolean {
    return this.userLoggedInStatus;
  }

  logoutUser() {
    this.userLoggedInStatus = false;
  }

  setUserToCurrent() {
    this.loggedInUser = new User("", "");
    this.userLoggedInStatus = false;
  }

}
