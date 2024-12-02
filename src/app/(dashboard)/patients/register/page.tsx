"use client";

import { useAuth } from '@/context/AuthContext';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import PatientRegistrationForm from '@/components/patients/PatientRegistrationForm';

export default function PatientRegistrationPage() {
  return (
    <ProtectedRoute requiredPermission="manage_patients">
      <div className="page-container">
        <h1 className="page-title">Register New Patient</h1>
        <PatientRegistrationForm />
      </div>
    </ProtectedRoute>
  );
} 