import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { Patient } from '../models/patient';
import { PatientsService } from '../services/patients.service';
import { MessageDialogComponent } from '../message-dialog.component';

@Component({
  selector: 'app-patients',
  imports: [
    MatFormFieldModule, MatSelectModule,MatInputModule,FormsModule, MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
  MatButtonModule,
  ReactiveFormsModule,
  CommonModule,
  MatCardModule,
 
  ],
  templateUrl: './patients.component.html',
  styleUrl: './patients.component.css'
})
export class PatientsComponent {
  editmode=0;
  selectedPatientId: string | null = null;
   patients:Patient[]=[];
   patientCount=0;

   
    PatientAdd=new FormGroup({
      name: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
    age: new FormControl('', Validators.required),
  
    })
    constructor(private patientService:PatientsService,private dialog:MatDialog) {
      this.getAllPatients();
    }

    onSubmit():void{
      if(this.PatientAdd.valid){
        const formValue = this.PatientAdd.value
        const updatedPatient: Patient = {
           name: formValue.name ?? '',
        age: Number(formValue.age) ?? 0,
        gender: formValue.gender ?? ''
       };
       
        if (this.editmode && this.selectedPatientId) {
      // update existing patient
      this.patientService.updatePatientData(this.selectedPatientId, updatedPatient).subscribe(
        (response) => {
           this.dialog.open(MessageDialogComponent, {
             data: { message: 'update patient successfully!' }
          });
          this.getAllPatients();
          this.PatientAdd.reset();
          this.editmode = 0;
          this.selectedPatientId = null;
        },
        (error) => {
          console.error('Error updating patient:', error);
        }
      );
    } else {
      // add new patient
      this.patientService.addPatient(updatedPatient).subscribe(response => {
        {
           this.dialog.open(MessageDialogComponent, {
             data: { message: 'patient added successfully!' }
          });
        this.getAllPatients();
        this.PatientAdd.reset();
      }
      })
    }
  }
    }

    getAllPatients(){
      this.patientService.getPatients().subscribe(result=>{
        this.patients=result;
        this.patientCount = this.patients.length;
        
      })
    }
    
    updatePatient(patient:Patient){
      this.editmode = 1;
      this.selectedPatientId = patient._id ?? null;

    this.PatientAdd.patchValue({
      name: patient.name,
       age: patient.age.toString(), 
      gender: patient.gender
   });

    }
   
      
    
    deletePatient(userId: string | undefined):void{
      
      if (!userId) {
    console.error("User ID is undefined");
    return;
       }   
      this.patientService.deletePatientData(userId).subscribe(result=>{
        this.dialog.open(MessageDialogComponent, {
             data: { message: 'patient deleted successfully!' }
          });
        this.getAllPatients()
      })
    }
  }
