import { UserRole } from '@/types/auth';

export type Permission = 
  | 'view_dashboard'
  | 'manage_users'
  | 'view_patients'
  | 'manage_patients'
  | 'view_appointments'
  | 'manage_appointments'
  | 'view_billing'
  | 'manage_billing'
  | 'view_medical_records'
  | 'manage_medical_records'
  | 'view_prescriptions'
  | 'manage_prescriptions'
  | 'view_settings'
  | 'manage_settings'
  | 'view_profile'
  | 'manage_profile';

export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  superAdmin: [
    'view_dashboard',
    'manage_users',
    'view_patients',
    'manage_patients',
    'view_appointments',
    'manage_appointments',
    'view_billing',
    'manage_billing',
    'view_medical_records',
    'manage_medical_records',
    'view_prescriptions',
    'manage_prescriptions',
    'view_settings',
    'manage_settings',
    'view_profile',
    'manage_profile'
  ],
  admin: [
    'view_dashboard',
    'manage_users',
    'view_patients',
    'manage_patients',
    'view_appointments',
    'manage_appointments',
    'view_billing',
    'manage_billing',
    'view_settings',
    'view_profile',
    'manage_profile'
  ],
  doctor: [
    'view_dashboard',
    'view_patients',
    'manage_patients',
    'view_appointments',
    'view_medical_records',
    'manage_medical_records',
    'view_prescriptions',
    'manage_prescriptions',
    'view_profile',
    'manage_profile'
  ],
  nurse: [
    'view_dashboard',
    'view_patients',
    'view_medical_records',
    'manage_medical_records',
    'view_prescriptions',
    'view_profile',
    'manage_profile'
  ],
  receptionist: [
    'view_dashboard',
    'view_patients',
    'view_appointments',
    'manage_appointments',
    'view_billing',
    'manage_billing',
    'view_profile',
    'manage_profile'
  ],
  patient: [
    'view_dashboard',
    'view_appointments',
    'view_medical_records',
    'view_prescriptions',
    'view_profile',
    'manage_profile'
  ],
};

export const hasPermission = (role: UserRole, permission: Permission): boolean => {
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
}; 