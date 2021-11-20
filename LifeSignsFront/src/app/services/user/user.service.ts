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
  // private urlBase = "http://ec2-18-116-241-177.us-east-2.compute.amazonaws.com:9025/LifeSigns";

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

  public updateUserProfile(user:User): Observable<User>{
    let url = this.urlBase + "/user/update/" + user.userid;
    return this.http.patch<User>(url, user, this.httpHead);
  }

  public updatePassword(passwords:string): Observable<User[]> {
    return this.http.post<User[]>(this.urlBase + "/changePassword", passwords, this.httpHead);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.urlBase+ "/user", this.httpHead);
  }

  userLoginStatus(user: User) {

    this.loggedInUser = user;
    this.userLoggedInStatus = true;
  }

  getLoggedInUser():User {
    // return JSON.parse(localStorage.getItem('currentUser'));
    // return this.loggedInUser;
    this.loggedInUser = JSON.parse(localStorage.getItem('currentUser'));
    return this.loggedInUser;

  }

  isUserLoggedIn():boolean {
    return this.userLoggedInStatus;
  }

  logoutUser() {
    this.userLoggedInStatus = false;
    localStorage.removeItem('currentUser');
  }

  setUserToCurrent() {
    // this.loggedInUser = new User("", "", "", 0);
    this.userLoggedInStatus = false;
  }

  public updateUserPref(user:any): Observable<User>{
    let url = this.urlBase + "/user/update/" + user.userid;
    return this.http.patch<User>(url, user, this.httpHead);
  }
}
