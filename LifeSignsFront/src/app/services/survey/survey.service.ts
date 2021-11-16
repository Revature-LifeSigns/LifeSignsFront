import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { covidSurvey } from '../util/covidSurvey';

@Injectable({
  providedIn: 'root',
})
export class SurveyService {
  private urlBase = 'http://localhost:9025/LifeSigns';

  private httpHead = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }),
  };

  constructor(private http: HttpClient) {}

  public insertSurvey(survey: String): Observable<covidSurvey> {
    return this.http.post<covidSurvey>(
      `${this.urlBase}/survey/insert`,
      survey,
      this.httpHead
    );
  }
}
