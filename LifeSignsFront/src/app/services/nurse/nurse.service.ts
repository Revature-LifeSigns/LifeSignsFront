import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Nurse } from "../util/nurse";
import { Chart } from '../util/chart';

@Injectable({
  providedIn: 'root'
})
export class NurseService {

  private urlBase = "http://localhost:9025";
  private nurseUrl = this.urlBase + "/nurse";
  private httpHead = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  }

  constructor(private http:HttpClient) { }

  public getNurseProfile(userId:number): Observable<Nurse> {
    let url = this.nurseUrl + "/id/" + userId;
    return this.http.get<Nurse>(url, this.httpHead);
  }
  public updateNurseProfile(nurse:Nurse): Observable<Object>{
    let url = this.nurseUrl + "/update/" + nurse.user_id;
    return this.http.post<String>(url, nurse, this.httpHead);
  }

  public uploadPhoto(photo: FormData): Observable<any> {
    let url = this.nurseUrl  + "" ;//add later;
    let httpHead = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*'
      })
    }
    return this.http.post<Object>(url, photo, httpHead);
  }

  public sendPatientChart(chart:Chart): Observable<Object>{
    let url = this.nurseUrl + "/diagnosis" ;
    return this.http.post<String>(url, chart, this.httpHead);
  }
}
