import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../util/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // url to store memory for auth
  public returnUrl: string = "";

  private loggedInUser!: User;
  private userLoggedInStatus!: boolean;

  private urlBase = "http://localhost:9025/LifeSigns";

  private httpHead = {
    headers: new HttpHeaders({
      'Content-Type':'application/json',
      'Access-Control-Allow-Origin':'*'
    })
  };

  constructor(private http: HttpClient) {}

  public insertUser(user:string): Observable<User[]> {
    return this.http.post<User[]>(this.urlBase + "/register", user, this.httpHead);
  }

  loginUser(user:string):Observable<User> {
    return this.http.post<User>(this.urlBase + "/login", user, this.httpHead);
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
    this.loggedInUser = new User("", "", "", 0);
    this.userLoggedInStatus = false;
  }

}
