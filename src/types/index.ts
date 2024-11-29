// Define common types
export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  email: string;
  phone: string;
  address: string;
  medicalHistory: string[];
  appointments: Appointment[];
}

export interface Appointment {
  id: string;
  patientId: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  type: string;
  notes?: string;
}

export interface User {
  id: string;
  username: string;
  role: 'admin' | 'doctor' | 'nurse' | 'receptionist';
  name: string;
  email: string;
} 