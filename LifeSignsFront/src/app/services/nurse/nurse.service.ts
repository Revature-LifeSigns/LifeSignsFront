import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Chart } from '../util/chart';
import { User } from '../util/user';
import { Photo } from '../util/photo';

@Injectable({
  providedIn: 'root'
})
export class NurseService {

  private urlBase = "http://localhost:9025/LifeSigns";
  // private urlBase = "http://ec2-18-116-241-177.us-east-2.compute.amazonaws.com:9025/LifeSigns";
  private httpHead = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  }

  constructor(private http:HttpClient) { }


  public getPhoto(user:any): Observable<Photo>{
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
    return this.http.post<String>(url, photo, httpHead);
  }

  public sendPatientChart(chart:String): Observable<Chart>{
    let url = this.urlBase + "/chart/insert" ;
    return this.http.post<Chart>(url, chart, this.httpHead);
  }

  public getAllCharts(): Observable<Chart[]> {
    let url = this.urlBase + "/chart";
    return this.http.get<Chart[]>(url, this.httpHead);
  }
}
