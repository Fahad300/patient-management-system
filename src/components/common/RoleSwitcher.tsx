"use client";

import { Select } from 'antd';
import { useAuth } from '@/context/AuthContext';
import { TEST_USERS } from '@/lib/testUsers';

const RoleSwitcher = () => {
  const { user, switchRole } = useAuth();

  // Only show for superAdmin
  if (user?.role !== 'superAdmin') return null;

  const handleRoleChange = (role: string) => {
    const selectedUser = Object.values(TEST_USERS).find(u => u.role === role);
    if (selectedUser) {
      switchRole(selectedUser);
    }
  };

  return (
    <Select
      defaultValue={user.role}
      onChange={handleRoleChange}
      style={{ width: 150 }}
      options={[
        { label: 'Super Admin', value: 'superAdmin' },
        { label: 'Admin', value: 'admin' },
        { label: 'Doctor', value: 'doctor' },
        { label: 'Nurse', value: 'nurse' },
        { label: 'Receptionist', value: 'receptionist' },
        { label: 'Patient', value: 'patient' },
      ]}
    />
  );
};

export default RoleSwitcher; 