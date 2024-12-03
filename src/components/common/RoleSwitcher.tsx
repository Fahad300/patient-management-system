"use client";

import React, { useEffect, useState } from 'react';
import { Select, message } from 'antd';
import { useAuth } from '@/context/AuthContext';

interface Role {
  id: string;
  name: string;
  description: string;
}

const RoleSwitcher = () => {
  const { user, switchRole } = useAuth();
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);

  // Only show for superAdmin
  if (user?.role?.name !== 'superAdmin') return null;

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await fetch('/api/roles');
      if (!response.ok) throw new Error('Failed to fetch roles');
      const data = await response.json();

      // Always ensure superAdmin role exists
      const superAdminRole = {
        id: 'superadmin',
        name: 'superAdmin',
        description: 'Full system access with all permissions',
      };

      // Add superAdmin if not present
      const hasSuper = data.some(role => role.name === 'superAdmin');
      setRoles(hasSuper ? data : [superAdminRole, ...data]);
    } catch (error) {
      console.error('Failed to fetch roles:', error);
      message.error('Failed to load roles');
      
      // Fallback to just superAdmin role if fetch fails
      setRoles([{
        id: 'superadmin',
        name: 'superAdmin',
        description: 'Full system access with all permissions',
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (roleId: string) => {
    try {
      const selectedRole = roles.find(role => role.id === roleId);
      if (!selectedRole) return;

      // Create a new user object with the selected role
      const updatedUser = {
        ...user!,
        role: selectedRole,
        // Ensure superAdmin always has all permissions
        permissions: selectedRole.name === 'superAdmin' ? 'all' : selectedRole.permissions,
      };

      switchRole(updatedUser);
      message.success(`Switched to ${selectedRole.name} role`);
    } catch (error) {
      console.error('Failed to switch role:', error);
      message.error('Failed to switch role');
    }
  };

  return (
    <Select
      loading={loading}
      value={user?.role?.id}
      onChange={handleRoleChange}
      style={{ width: 150 }}
      placeholder="Select Role"
      options={roles.map(role => ({
        label: role.name,
        value: role.id,
        title: role.description,
      }))}
    />
  );
};

export default RoleSwitcher; 