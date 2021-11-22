import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Unit } from '../util/unit';
import { User } from '../util/user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  // private host = "localhost";
  private host = "3.84.182.36";
  private port = "9025"
  private userUrl = `http://${this.host}:${this.port}/LifeSigns/user`;
  private adminUrl = `http://${this.host}:${this.port}/LifeSigns/admin`;

  private httpHead = {
    headers: new HttpHeaders({
      'Content-Type':'application/json',
      'Access-Control-Allow-Origin':'*'
    })
  };

  constructor(private http: HttpClient) { }

  public getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl);
  }

  public getAllUnits(): Observable<Unit[]> {
    return this.http.get<Unit[]>(this.adminUrl+"/units");
  }

  public getUnit(userId:number): Observable<Unit> {
    return this.http.get<Unit>(this.adminUrl+"/assigned-unit/"+userId);
  }

  public insertOrUpdateUnitAssignment(userId:number, unit:Unit): Observable<User[]>{
    return this.http.post<User[]>(this.adminUrl+"/assign-units/"+userId, unit, this.httpHead);
  }
}
