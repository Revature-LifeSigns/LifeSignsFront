import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Doctor } from '../Models/doctorInterface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private url ="http://localhost:9001/doctors";
  private currentDoctor!: Doctor;
  private loginDoctorStatus!: boolean;

  private httpHead = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };

  constructor(private http: HttpClient) { }

  signUpDoctor(doctor: Doctor):Observable<Doctor> {
    return this.http.post<Doctor>(this.url, doctor, this.httpHead);
  }

  updateDoctor(doctor: Doctor):Observable<Doctor> {
    return this.http.patch<Doctor>(this.url, doctor, this.httpHead);
  }

  setDoctor(doctor:Doctor) {
    this.currentDoctor = doctor;
    this.loginDoctorStatus = true;
  }

  getDoctor():Doctor {
    return this.currentDoctor;
  }
}
