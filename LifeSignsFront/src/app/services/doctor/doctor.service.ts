import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Photo } from '../util/photo';
import { User } from '../util/user';
import { Chart } from '../util/chart';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private url ="http://localhost:9025/LifeSigns/";

  private httpHead = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };

  constructor(private http: HttpClient) { }

  public getPhoto(user:User): Observable<Photo>{
    return this.http.get<Photo>((this.url + "photo/" + user.userid), this.httpHead);
  }

  public uploadPhoto(photo: FormData): Observable<any> {
    return this.http.post<Object>((this.url + "photo"), photo, this.httpHead);
  }

  //Placeholder method. Waiting for chart id
  public getPatientChart(chart?:Chart): Observable<Object>{
    return this.http.get<String>((this.url + "chart"), this.httpHead);
  }

  //Placeholder method. Waiting for chart id
  public updatePatientChart(chart:Chart): Observable<Object>{
    return this.http.patch<String>((this.url + "chart/update"), chart, this.httpHead);
  }

}
