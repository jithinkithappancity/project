import { Component, OnInit } from '@angular/core';
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

import { Doctor } from '../models/doctor';

import { DoctorService } from '../services/doctor.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MessageDialogComponent } from '../message-dialog.component';



@Component({
  selector: 'app-doctors',
  imports: [
    MatFormFieldModule, MatSelectModule,MatInputModule,FormsModule, MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatButtonModule,
   ReactiveFormsModule,
    CommonModule,
   MatCardModule,
   
 
  ],
  
  templateUrl: './doctors.component.html',
  styleUrl: './doctors.component.css'
})
export class DoctorsComponent implements OnInit {
  editmode=0;
  selectedDoctorId: string | null = null;
  doctors:Doctor[]=[];
  doctorsCount=0;
 doctorForm = new FormGroup({
    name: new FormControl('', Validators.required),
    specialization: new FormControl('', Validators.required)
  });

  constructor(private doctorService:DoctorService,private dialog:MatDialog) {}
  ngOnInit(): void {
     this.getDoctors();
    // Any initialization logic if needed
  }


  onSubmit(): void {
    if (this.doctorForm.valid) {
      const formValue = this.doctorForm.value;
        const doctor: Doctor = {
                  name: formValue.name ?? '',
                  specialization: formValue.specialization ?? ''
                  };
      
    if (this.editmode && this.selectedDoctorId) {
      // Update doctor
      this.doctorService.updateDoctor(this.selectedDoctorId, doctor).subscribe(
        (response) => {
           this.dialog.open(MessageDialogComponent, {
                     data: { message: 'update Doctor successfully!' }
                    });
          this.getDoctors();
          this.doctorForm.reset();
          this.editmode = 0;
          this.selectedDoctorId = null;
        },
        (error) => {
          console.error('Error updating doctor:', error);
        }
      );
    } else {
      // Add doctor
      this.doctorService.addDoctor(doctor).subscribe(
        (response) => {
           this.dialog.open(MessageDialogComponent, {
                     data: { message: 'New Doctor Added successfully!' }
                    });
          this.getDoctors();
          this.doctorForm.reset();
        },
        (error) => {
          console.error('Error adding doctor:', error);
        }
      );
    }
  } else {
    console.log('Form is invalid');
  }
}


getDoctors(){
  this.doctorService.getDoctor().subscribe(result=>{
    this.doctors=result;
    this.doctorsCount=this.doctors.length
  }

  )
  console.log(this.doctors)
}


deleteUser(userId: string | undefined): void {
  if (!userId) {
    console.error("User ID is undefined");
    return;
  }

  this.doctorService.deleteDoctor(userId).subscribe({
    next: (response: { message: string }) => {
       this.dialog.open(MessageDialogComponent, {
                     data: { message: 'Delete Doctor successfully!' }
                    });
      this.getDoctors();
    },
    error: (err) => {
      console.error("Error deleting doctor:", err);
    }
  });
}

editDoctor(doctor: Doctor): void {
  this.editmode = 1;
  this.selectedDoctorId = doctor._id ?? null;

  this.doctorForm.patchValue({
    name: doctor.name,
    specialization: doctor.specialization
  });
}




// updateDoctor(userId: string | undefined): void {
//   if (!userId) {
//     console.error("User ID is undefined");
//     return;
//   }

  // const updatedData: Doctor = {
  //   name: this.doctorForm.value.name ?? '',
  //   specialization: this.doctorForm.value.specialization ?? ''
  // };

  // this.doctorService.updateDoctor(userId, updatedData).subscribe({
  //   next: (response) => {
  //     alert("Doctor updated successfully!");
  //     console.log("Updated Doctor:", response);
  //     this.getDoctors();
  //   },
  //   error: (err) => {
  //     console.error("Update failed:", err);
  //   }
  // });
// }



}
  






   
 
