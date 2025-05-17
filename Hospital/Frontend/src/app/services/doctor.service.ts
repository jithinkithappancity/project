import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Doctor } from '../models/doctor';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DoctorService {
   private apiUrl = 'http://localhost:5000/api/doctors';
   private getDoctorurl="http://localhost:5000/api/doctors"
   private deleteDoctorurl="http://localhost:5000/api/doctors"

  constructor(private http:HttpClient) { }

   addDoctor(doctor: Doctor): Observable<Doctor> {
  return this.http.post<Doctor>(this.apiUrl, doctor);
  }

  getDoctor(){
    return this.http.get<Doctor[]>(this.getDoctorurl);
  }

  // deleteDoctor(Id:string){
  //   this.http.delete(this.deleteDoctorurl+Id)
  // }
  deleteDoctor(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }


  updateDoctor(id: string, doctor: Doctor): Observable<Doctor> {
  return this.http.put<Doctor>(`${this.apiUrl}/${id}`, doctor);
}

}
