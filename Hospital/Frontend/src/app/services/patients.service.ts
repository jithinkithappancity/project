import { Injectable } from '@angular/core';
import { Patient } from '../models/patient';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {
 url="http://localhost:5000/api/patients"
 deleteurl="http://localhost:5000/api/patients/"

  constructor(private http:HttpClient) { }

  addPatient(patient:Patient){
    return this.http.post(this.url,patient)
  }
  
  getPatients(){
    return this.http.get<Patient[]>(this.url)
  }

  updatePatientData(userId: string, updatedData: Patient): Observable<any> {
    return this.http.put(this.deleteurl+userId,updatedData)

  }

  deletePatientData(userId: string):Observable<any>{
    return this.http.delete(this.deleteurl+userId)

  }
}
