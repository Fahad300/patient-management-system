"use client";

import { useAuth } from '@/context/AuthContext';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import AdminStats from '@/components/dashboard/AdminStats';
import DoctorStats from '@/components/dashboard/DoctorStats';
import NurseStats from '@/components/dashboard/NurseStats';
import ReceptionistStats from '@/components/dashboard/ReceptionistStats';
import PatientStats from '@/components/dashboard/PatientStats';

export default function DashboardPage() {
  const { user } = useAuth();

  const renderDashboardContent = () => {
    switch (user?.role) {
      case 'superAdmin':
      case 'admin':
        return <AdminStats />;
      case 'doctor':
        return <DoctorStats />;
      case 'nurse':
        return <NurseStats />;
      case 'receptionist':
        return <ReceptionistStats />;
      case 'patient':
        return <PatientStats />;
      default:
        return null;
    }
  };

  return (
    <ProtectedRoute requiredPermission="view_dashboard">
      <div className="dashboard-container">
        <h1 className="dashboard-header" style={{ 
          color: 'var(--color-text-primary)',
          fontSize: 'var(--font-size-xl)',
          marginBottom: 'var(--spacing-lg)'
        }}>
          {user?.role === 'patient' ? 'My Dashboard' : 'Dashboard'}
        </h1>
        
        {renderDashboardContent()}
      </div>
    </ProtectedRoute>
  );
} 