import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';

import { AppoinmentsService } from '../services/appoinments.service';
import { Patient } from '../models/patient';
import { PatientsService } from '../services/patients.service';
import { DoctorService } from '../services/doctor.service';
import { Doctor } from '../models/doctor';
import { Appointment } from '../models/appointment';
import { L } from '@angular/cdk/keycodes';
import { MatDialog } from '@angular/material/dialog';
import { MessageDialogComponent } from '../message-dialog.component';


@Component({
  
  selector: 'app-appoiments',
  imports: [MatFormFieldModule, MatSelectModule,MatInputModule,FormsModule, MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
  MatButtonModule,
  ReactiveFormsModule,
  CommonModule,
  MatCardModule],
  templateUrl: './appoiments.component.html',
  styleUrl: './appoiments.component.css',
})
export class AppoimentsComponent {
  selectedAppointmentId:string |null =null
  editmode=0;
  doctors:Doctor[]=[];
  patientsDatas:Patient[]=[];
  appointments:Appointment[]=[]
  appointmentNo=0;

  Appoiment=new FormGroup({
  Patient: new FormControl<string | null>(null),
  Doctor: new FormControl<string | null>(null),
  Date: new FormControl<Date | null>(null)

  })
  constructor(private appointment:AppoinmentsService,private patientService:PatientsService,private doctorService:DoctorService,private dialog:MatDialog){
    this.getAllPatients();
    this.getdoctors();
    this.getAppointments();
    
  }
  
  onSubmit() {
   if (this.Appoiment.valid) {
         const formValue = this.Appoiment.value;
           const  updatedAppointment = {
                     patientId: formValue.Patient ?? '',
                     doctorId:formValue.Doctor ?? '',
                     dateOfAppointment:new Date(formValue.Date ?? '')
                     
                     };
                     
                     
         
           if (this.editmode && this.selectedAppointmentId) {
              this.appointment.updateAppointment(this.selectedAppointmentId, updatedAppointment).subscribe(result => {
          this.dialog.open(MessageDialogComponent, {
           data: { message: 'Appoinment added successfully!' }
          });

          this.getAppointments();
          this.Appoiment.reset();
          this.editmode = 0;
          this.selectedAppointmentId = null;
        },
        (error) => {
          console.error('Error updating appointment:', error);
        }
      );
        } else {
      // Add new
          this.appointment.addAppointment(updatedAppointment).subscribe(result => {
          this.getAppointments();
            this.dialog.open(MessageDialogComponent, {
           data: { message: 'New Appoinment added successfully!' }
          });
            this.Appoiment.reset();
        });
     }
  }
  }

  deleteAppoiment(appointId:string | undefined):void{

      if (!appointId) {
    console.error("User ID is undefined");
    return;
       }   
      this.appointment.deleteAppointment(appointId).subscribe(result=>{
         this.dialog.open(MessageDialogComponent, {
           data: { message: 'Deleted successfully!' }
          });
        this.getAppointments();
        
      })
    }





  editAppointments(appoint:Appointment){
    this.editmode=1
    this.selectedAppointmentId = appoint._id ?? null;

    this.Appoiment.patchValue({
    Patient: typeof appoint.patientId === 'object' ? appoint.patientId._id : appoint.patientId,
    Doctor: typeof appoint.doctorId === 'object' ? appoint.doctorId._id : appoint.doctorId,
    Date: new Date(appoint.dateOfAppointment)
  });

  }
  deleteAppoiments(){
    alert("updated")
  }
  getAppointments(){
    this.appointment.getAppointment().subscribe(result=>{
      this.appointments=result;
      this.appointmentNo=this.appointments.length
       console.log(this.appointments)
    })
  }



  getdoctors(){
    this.doctorService.getDoctor().subscribe(result=>{
      this.doctors=result;
       
      
    })

  }

   getAllPatients(){
      this.patientService.getPatients().subscribe(result=>{
        this.patientsDatas=result;

      })
    }



}
