import { Doctor } from "./doctor";
import { Patient } from "./patient";

export interface Appointment {
  _id?: string;
  patientId: Patient;
  doctorId: Doctor;
  dateOfAppointment: Date | string;
}