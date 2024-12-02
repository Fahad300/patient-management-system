import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'src/lib/db/data');
const PATIENTS_FILE = path.join(DB_PATH, 'patients.json');

// Ensure the data directory exists
if (!fs.existsSync(DB_PATH)) {
  fs.mkdirSync(DB_PATH, { recursive: true });
}

// Initialize patients file if it doesn't exist
if (!fs.existsSync(PATIENTS_FILE)) {
  fs.writeFileSync(PATIENTS_FILE, JSON.stringify([]));
}

export interface PatientData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  email: string;
  phone: string;
  bloodGroup?: string;
  notes?: string;
}

export interface Patient extends PatientData {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export const getPatients = (): Patient[] => {
  const data = fs.readFileSync(PATIENTS_FILE, 'utf-8');
  return JSON.parse(data);
};

export const getPatientById = (id: string): Patient | null => {
  const patients = getPatients();
  return patients.find(p => p.id === id) || null;
};

export const createPatient = (data: PatientData): Patient => {
  const patients = getPatients();
  const newPatient: Patient = {
    ...data,
    id: `PAT${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  patients.push(newPatient);
  fs.writeFileSync(PATIENTS_FILE, JSON.stringify(patients, null, 2));
  return newPatient;
};

export const updatePatient = (id: string, data: Partial<PatientData>): Patient | null => {
  const patients = getPatients();
  const index = patients.findIndex(p => p.id === id);
  
  if (index === -1) return null;
  
  patients[index] = {
    ...patients[index],
    ...data,
    updatedAt: new Date().toISOString(),
  };
  
  fs.writeFileSync(PATIENTS_FILE, JSON.stringify(patients, null, 2));
  return patients[index];
};

export const deletePatient = (id: string): boolean => {
  const patients = getPatients();
  const filteredPatients = patients.filter(p => p.id !== id);
  
  if (filteredPatients.length === patients.length) return false;
  
  fs.writeFileSync(PATIENTS_FILE, JSON.stringify(filteredPatients, null, 2));
  return true;
}; 