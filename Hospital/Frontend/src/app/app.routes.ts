import { Routes } from '@angular/router';
import { AppoimentsComponent } from './appoiments/appoiments.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { PatientsComponent } from './patients/patients.component';

export const routes: Routes = [
    {path:' ',component:DoctorsComponent},
    {path:'a',component:AppoimentsComponent},
    {path:'doctor',component:DoctorsComponent},
    {path:'patient',component:PatientsComponent},
    {path:'aa',component:PatientsComponent}
];
