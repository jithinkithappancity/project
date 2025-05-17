import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Appointment } from '../models/appointment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppoinmentsService {

  geturl="http://localhost:5000/api/patients"
  getDoctorUrl="http://localhost:5000/api/doctors"
  appointmentUrl="http://localhost:5000/api/appointments"
   appointmentdeleteUrl="http://localhost:5000/api/appointments/"
  constructor(private http:HttpClient) { }



  getAppointment(){
    return this.http.get<Appointment[]>(this.appointmentUrl)
  }

  addAppointment(appointment:{ patientId: string, doctorId: string, dateOfAppointment: Date }){
    console.log(appointment);
    return this.http.post(this.appointmentUrl,appointment)
  }

  deleteAppointment(id:string){
    return this.http.delete(this.appointmentdeleteUrl+id)
  }

  updateAppointment(id: string, data: any) {
  return this.http.put<{ message: string }>(this.appointmentdeleteUrl+id, data);
}
  

}
