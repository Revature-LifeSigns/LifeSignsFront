import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Nurse } from "../util/nurse";
import { Chart } from '../util/chart';
import { User } from '../util/user';
import { Photo } from '../util/photo';

@Injectable({
  providedIn: 'root'
})
export class NurseService {

  // private urlBase = "http://localhost:9025/LifeSigns";
  private urlBase = "http://ec2-3-90-86-121.compute-1.amazonaws.com:9025/LifeSigns";
  private httpHead = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  }

  constructor(private http:HttpClient) { }


  public getPhoto(user:User): Observable<Photo>{
    let url = this.urlBase + "/photo/" + user.userid ;
    return this.http.get<Photo>(url, this.httpHead);
  }



  public uploadPhoto(photo: FormData): Observable<any> {
    let url = this.urlBase  + "/photo";
    let httpHead = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*'
      })
    }
    return this.http.post<Object>(url, photo, httpHead);
  }

  public sendPatientChart(chart:Chart): Observable<Object>{
    let url = this.urlBase + "/chart/insert" ;
    return this.http.post<String>(url, chart, this.httpHead);
  }
}
